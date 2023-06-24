import { Router } from 'express';
import { productsController } from '@server/controllers';

const productsRouter: Router = Router();
const apiURL = process.env.API_URL;

productsRouter.get(`${apiURL}/products`, productsController.getProducts);

export { productsRouter };
