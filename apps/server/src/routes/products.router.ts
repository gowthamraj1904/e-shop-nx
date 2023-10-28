import { NextFunction, Request, Response, Router } from 'express';
import ProductsController from '@server/controllers/products.controller';

function productsRouter(): Router {
    const router: Router = Router();
    const productsController: ProductsController = new ProductsController();

    router.get('/products', (req: Request, res: Response, next: NextFunction) =>
        productsController.getProducts(req, res, next)
    );

    return router;
}

export default productsRouter;
