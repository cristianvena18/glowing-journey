// Use the router
import {bold, cyan, green, yellow} from '../vendor/fmt/colors.ts';
import {Application, Context, Status} from "../vendor/server/index.ts";
import Routes from "../API/Http/Routes/index.ts";

function notFound(context: Context) {
    context.response.status = Status.NotFound;
    context.response.body =
        `<html><body><h1>404 - Not Found</h1><p>Path <code>${context.request.url}</code> not found.`;
}

let app = new Application();

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