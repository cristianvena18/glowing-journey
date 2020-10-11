import StoreUserAdapter from "../../Adapters/Users/StoreUserAdapter.ts";
import StoreUserHandler from "../../../../Application/Commands/Handler/Users/StoreUserHandler.ts";
import HttpStatus from "../../Enums/HttpStatus.ts";
import {Request, Response} from "../../../../vendor/Interfaces/Http/Server.ts";

class StoreUserAction {
    // @ts-ignore
    public async execute(request: Request): Promise<Response> {
        const adapter = new StoreUserAdapter();

        const handler = new StoreUserHandler();

        const command = await adapter.adapt(request.body);

        const user = await handler.execute(command);
        return {body: user, status: HttpStatus.OK};
    }
}

export default StoreUserAction;