import { Router } from 'express';
import { productsController } from '@server/controllers';

const productsRouter: Router = Router();

productsRouter.get('/products', productsController.getProducts);

export { productsRouter };
