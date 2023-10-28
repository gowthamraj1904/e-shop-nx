import { NextFunction, Request, Response } from 'express';
import BaseApiController from '@server/controllers/base-api.controller';

export default class OrdersController extends BaseApiController {
    constructor() {
        super();
    }

    public getOrders(req: Request, res: Response, next: NextFunction): void {
        try {
            const response: string[] = [];

            res.locals.data = response;
            super.send(res);
        } catch (error) {
            next(error);
        }
    }
}
