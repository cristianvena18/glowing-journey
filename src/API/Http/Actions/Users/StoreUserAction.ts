import StoreUserAdapter from "../../Adapters/Users/StoreUserAdapter.ts";
import StoreUserHandler from "../../../../Application/Commands/Handler/Users/StoreUserHandler.ts";
import HttpStatus from "../../Enums/HttpStatus.ts";

class StoreUserAction {
    public async execute({request, response}: any) {
        const adapter = new StoreUserAdapter();

        const handler = new StoreUserHandler();

        if (request.type !== 'json') {
            response.status = HttpStatus.BAD_REQUEST;
            response.body = 'Only accepts json';
        }

        const body = await request.body().value;

        const command = await adapter.adapt(body);

        response.body = await handler.execute(command);
    }
}

export default StoreUserAction;