import { Router } from "../../../vendor/server/index.ts";
import withBookRoutes from './books.ts';
import withRecipesRoutes from './recipes.ts';


const router = new Router();

withBookRoutes(router);
withRecipesRoutes(router);
// @ts-ignore
router.get('/', async ({response}) => {
    response.body = 'Hello';
})

export default router;