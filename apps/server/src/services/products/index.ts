import { Request } from 'express';
import { ProductSchema } from '@server/schemas';
import { IProductsApiResponse } from '@server/models';

async function getProducts(req: Request): Promise<IProductsApiResponse> {
    let response: IProductsApiResponse;
    const filter: { category: string[] } = {
        category: []
    };

    try {
        // Filter based on the query params
        const categories: string = req.query?.categories as string;

        if (categories) {
            filter.category = categories.split(',');
        }

        const products = await ProductSchema.find(
            filter.category.length > 0 ? filter : null
        ).populate('category');

        if (products?.length) {
            response = {
                status: 200,
                message: 'Success',
                products
            };
        } else {
            response = {
                status: 400,
                message: 'Products are empty',
                products
            };
        }
    } catch (error: unknown) {
        response = {
            status: 400,
            message: 'error',
            error
        };
    }

    return response;
}

export { getProducts };
