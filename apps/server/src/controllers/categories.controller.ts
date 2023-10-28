import { NextFunction, Request, Response } from 'express';
import BaseApiController from '@server/controllers/base-api.controller';
import CategoriesService from '@server/services/categories.service';

export default class CategoriesController extends BaseApiController {
    readonly categoriesService: CategoriesService;
    constructor() {
        super();

        this.categoriesService = new CategoriesService();
    }

    public async getCategories(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response: [] = await this.categoriesService.getCategories(
                req,
                next
            );

            res.locals.data = response;
            super.send(res);
        } catch (error) {
            next(error);
        }
    }
}
