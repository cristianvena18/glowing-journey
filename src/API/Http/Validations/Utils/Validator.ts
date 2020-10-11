// @ts-ignore
import {mustBe} from "../../../../vendor/Validations/mustBe.ts";

class Validator {
    public validate = (body: any, schema: any) => {
        try {
            mustBe(schema)(body);
        }catch (e) {
            return e.message.replace(/\//gi, "");
        }
    }
}

export default Validator;