// Use the router
import {bold, cyan, green, red, yellow} from '../vendor/fmt/colors.ts';
import {Application, Context, isHttpError, Status} from "../vendor/server/index.ts";
import Routes from "../API/Http/Routes/index.ts";
import BaseHttpException from "../API/Http/Exceptions/BaseHttpException.ts";
import HttpStatus from "../API/Http/Enums/HttpStatus.ts";

function notFound(context: Context) {
    context.response.status = Status.NotFound;
    context.response.body =
        `<html><body><h1>404 - Not Found</h1><p>Path <code>${context.request.url}</code> not found.`;
}

let app = new Application();

// @ts-ignore
app.use(async (context, next) => {
    const request = await context.request.body();

    if (request.type !== 'json') {
        context.response.status = HttpStatus.NOT_ACCEPTABLE;
        context.response.type = 'json';
        context.response.body = { message: 'Only accepts json' };
        return;
    }
    await next();
})

// Logger
// @ts-ignore
app.use(async (context, next) => {
    await next();
    const rt = context.response.headers.get("X-Response-Time");
    console.log(
        `${green(context.request.method)} ${cyan(context.request.url.pathname)} - ${
            bold(
                String(rt),
            )
        }`,
    );
});

// Response Time
// @ts-ignore
app.use(async (context, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    context.response.headers.set("X-Response-Time", `${ms}ms`);
});

// @ts-ignore
app.use(async (context, next) => {
    try {
        await next();
    } catch (err) {
        if (isHttpError(err)) {
            context.response.status = err.status;
            const { message, status, stack } = err;
            if (context.request.accepts("json")) {
                context.response.body = { message, status, stack };
                context.response.type = "json";
            } else {
                context.response.body = `${status} ${message}\n\n${stack ?? ""}`;
                context.response.type = "text/plain";
            }
        } else {
            if (err instanceof BaseHttpException)
            {
                console.error(red(`Error: ${err.message}`));

                context.response.body = {message: err.message, stack: err.stack};
                context.response.status = err.getStatus();
                context.response.type = 'json';
                return;
            }
            console.log(err);
            throw err;
        }
    }
});

app.use(Routes.routes());
app.use(Routes.allowedMethods());

// A basic 404 page
app.use(notFound);

app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://";
    const url = `${protocol}${hostname ?? "localhost"}:${port}`;

    console.log(
        bold("Start listening on ") + yellow(url),
    );
});

// @ts-ignore
await app.listen({ port: 80 });