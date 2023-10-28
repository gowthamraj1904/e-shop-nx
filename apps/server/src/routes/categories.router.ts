import { NextFunction, Request, Response, Router } from 'express';
import CategoriesController from '@server/controllers/categories.controller';

function categoriesRouter(): Router {
    const router: Router = Router();
    const categoriesController: CategoriesController =
        new CategoriesController();

    router.get(
        '/categories',
        (req: Request, res: Response, next: NextFunction) =>
            categoriesController.getCategories(req, res, next)
    );

    return router;
}

export default categoriesRouter;
