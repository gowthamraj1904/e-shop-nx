import { Request, Response } from 'express';
import { ProductsService } from '@server/services';
import { IProductsApiResponse } from '@server/models';

async function getProducts(req: Request, res: Response): Promise<Response> {
    const response: IProductsApiResponse = await ProductsService.getProducts(
        req
    );

    return res.json(response);
}

export { getProducts };
