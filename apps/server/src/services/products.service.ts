import { NextFunction, Request } from 'express';
import { ProductSchema } from '@server/schemas';
import { IProductsApiResponse } from '@server/models';

export default class ProductsService {
    public async getProducts(
        req: Request,
        next: NextFunction
    ): Promise<IProductsApiResponse> {
        try {
            const filter: { category: string[] } = {
                category: []
            };
            // Filter based on the query params
            const categories: string = req.query?.categories as string;

            if (categories) {
                filter.category = categories.split(',');
            }

            const products = await ProductSchema.find(
                filter.category.length > 0 ? filter : null
            ).populate('category');

            const response: IProductsApiResponse = {
                status: 200,
                message: 'Success',
                products
            };

            return response;
        } catch (error: unknown) {
            next(error);
        }
    }
}
