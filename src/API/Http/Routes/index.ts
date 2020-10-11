import { Router } from "../../../vendor/server/index.ts";
import withBookRoutes from './books.ts';
import withRecipesRoutes from './recipes.ts';
import {withUsersRoutes} from "./users.ts";


const router = new Router();

withBookRoutes(router);
withRecipesRoutes(router);
withUsersRoutes(router);
// @ts-ignore
router.get('/', async ({response}) => {
    response.body = 'Hello';
})

export default router;