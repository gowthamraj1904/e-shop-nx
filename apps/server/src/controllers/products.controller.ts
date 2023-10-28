import { NextFunction, Request, Response } from 'express';
import ProductsService from '@server/services/products.service';
import { IProductsApiResponse } from '@server/models';
import BaseApiController from '@server/controllers/base-api.controller';

export default class ProductsController extends BaseApiController {
    readonly productsService: ProductsService;

    constructor() {
        super();

        this.productsService = new ProductsService();
    }

    public async getProducts(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response: IProductsApiResponse =
                await this.productsService.getProducts(req, next);

            res.locals.data = response;
            super.send(res);
        } catch (error) {
            next(error);
        }
    }
}
