import { NextFunction, Request, Response, Router } from 'express';
import OrderItemsController from '@server/controllers/order-items.controller';

function orderItemsRouter(): Router {
    const router: Router = Router();
    const orderItemsController: OrderItemsController =
        new OrderItemsController();

    router.post(
        '/order-items',
        (req: Request, res: Response, next: NextFunction) =>
            orderItemsController.getOrderItems(req, res, next)
    );

    return router;
}

export default orderItemsRouter;
