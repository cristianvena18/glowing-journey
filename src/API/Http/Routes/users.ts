import {Router} from "../../../vendor/server/index.ts";
import StoreUserAction from "../Actions/Users/StoreUserAction.ts";

const BASIC_PATH = '/users';

const storeAction = new StoreUserAction();

export const withUsersRoutes = (router: Router) => {
  router.post(BASIC_PATH, storeAction.execute);
}