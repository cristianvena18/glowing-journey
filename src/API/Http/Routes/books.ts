import {Router, RouterContext, Status} from "../../../vendor/server/index.ts";
import Book from "../../../Domain/Entities/Book.ts";

// @ts-ignore
const books = new Map<string, Book>();

// @ts-ignore
const BASIC_PATH = '/books';

const withBookRoutes = (router: Router) => {
    // @ts-ignore
    router.get(BASIC_PATH, async (context) => {
        // @ts-ignore
        context.response.body = Array.from(books.values());
    });

// @ts-ignore
    router.post(BASIC_PATH, async (context: RouterContext) => {
        console.log("post book");
        if (!context.request.hasBody) {
            context.throw(Status.BadRequest, "Bad Request");
        }
        const body = await context.request.body();
        let book: Partial<Book> | undefined;
        if (body.type === "json") {
            book = await body.value;
        } else if (body.type === "form-data") {
            const formData = await body.value.read();
            book = formData.fields;
        }
        if (book) {
            context.assert(book.id && typeof book.id === "string", Status.BadRequest);
            books.set(book.id, book as Book);
            context.response.status = Status.OK;
            context.response.body = book;
            context.response.type = "json";
            return;
        }
        context.throw(Status.BadRequest, "Bad Request");
    });

// @ts-ignore
    router.get<{ id: string }>(`${BASIC_PATH}/:id`, async (context) => {
        if (context.params && books.has(context.params.id)) {
            context.response.body = books.get(context.params.id);
        } else {
            context.throw(Status.NotFound, 'Not found');
        }
    });
}

export default withBookRoutes