import {parseRequest, Router, RouterContext} from "../../../vendor/server/index.ts";
import StoreUserAction from "../Actions/Users/StoreUserAction.ts";

const BASIC_PATH = '/users';

const storeAction = new StoreUserAction();

export const withUsersRoutes = (router: Router) => {
  // @ts-ignore
  router.post(BASIC_PATH, async (context: RouterContext) => {
    const request = await parseRequest(context.request);
    const response = await storeAction.execute(request);
    context.response.body = response.body;
    context.response.type = response.type ?? 'json';
    context.response.status = response.status;
  });
}