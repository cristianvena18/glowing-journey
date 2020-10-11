// @ts-ignore
import Validator from "../../Validations/Utils/Validator.ts";
import ValidationException from "../../Exceptions/ValidationException.ts";
import StoreUserCommand from "../../../../Application/Commands/Command/Users/StoreUserCommand.ts";

class StoreUserAdapter {
    private validator: Validator;
    public constructor() {
        this.validator = new Validator()
    }

    public async adapt(body: any) {
        const error = this.validator.validate(body, {
            name: String,
            surname: String,
            email: String,
            password: String
        });

        if (error) {
            throw new ValidationException(error);
        }

        return new StoreUserCommand(
            body.name,
            body.surname,
            body.email,
            body.password,
        );
    }
}

export default StoreUserAdapter;