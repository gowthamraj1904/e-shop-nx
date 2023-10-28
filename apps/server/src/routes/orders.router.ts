import { NextFunction, Request, Response, Router } from 'express';
import OrdersController from '@server/controllers/orders.controller';

function ordersRouter(): Router {
    const router: Router = Router();
    const ordersController: OrdersController = new OrdersController();

    router.post('/orders', (req: Request, res: Response, next: NextFunction) =>
        ordersController.getOrders(req, res, next)
    );

    return router;
}

export default ordersRouter;
