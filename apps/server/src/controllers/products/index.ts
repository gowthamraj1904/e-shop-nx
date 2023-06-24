import { Request, Response } from 'express';
import { productSchema } from '@server/models';
import { Product } from '@libs/shared/interfaces';

async function getProducts(req: Request, res: Response): Promise<void> {
    const filter = {
        category: []
    };

    // Filter based on the query params
    const categories = req.query?.categories as string;
    if (categories) {
        filter.category = categories.split(',');
    }

    await productSchema
        .find(filter.category.length > 0 ? filter : null)
        .populate('category')
        .then((products: Product[]) => {
            res.status(200).send(products);
        })
        .catch((error: Error) => {
            const response = {
                message: 'Products are empty',
                error
            };
            res.status(400).json(response);
        });
}

export { getProducts };
