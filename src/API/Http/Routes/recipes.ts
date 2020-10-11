import {Router} from "../../../vendor/server/index.ts";

const BASIC_PATH = '/recipes'

const withRecipesRoutes = (router: Router) => {
    // @ts-ignore
    router.get(`${BASIC_PATH}/`, async (context) => {
        context.response.body = 'recipes is works';
    });

    return router;
}

export default withRecipesRoutes;