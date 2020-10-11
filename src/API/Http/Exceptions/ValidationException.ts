import HttpStatus from "../Enums/HttpStatus.ts";
import BaseHttpException from "./BaseHttpException.ts";

class ValidationException extends BaseHttpException {
    public constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);

    }

}

export default ValidationException;