// @ts-ignore
import {
    Application,
    Context,
    isHttpError,
    Router,
    RouterContext,
    Status,
} from "https://deno.land/x/oak/mod.ts";
// @ts-ignore
import {Request} from "../Interfaces/Http/Server.ts";

// @ts-ignore
export const parseRequest = async (request: Context.request) => {
    let body = await request.body().value;

    const req: Request = {
        method: request.method,
        body,
        url: request.url,
    };

    return req;
}

export {
    Application,
    Context,
    isHttpError,
    Router,
    RouterContext,
    Status
}

export default Application;