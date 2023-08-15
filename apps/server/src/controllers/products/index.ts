import { NextFunction, Request, Response } from 'express';
import { ProductsService } from '@server/services';
import { IProductsApiResponse } from '@server/models';

async function getProducts(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> {
    const response: IProductsApiResponse = await ProductsService.getProducts(
        req,
        next
    );

    if (response) {
        return res.json(response);
    }
}

export { getProducts };
