import { NextFunction, Request, Response, Router } from 'express';
import { loginRouter } from './login';
import { signupRouter } from './signup';
import { usersRouter } from './users';
import { productsRouter } from './products';
import { errorHandler } from '../middlewares';

const router: Router = Router();
const apiURL: string = process.env.API_URL;
const routers: Router[] = [
    loginRouter,
    signupRouter,
    usersRouter,
    productsRouter
];

router.use(apiURL, routers);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler.handleError(err, res, next);
});

export default router;
