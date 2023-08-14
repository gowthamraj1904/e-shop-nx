import { Router } from 'express';
import { loginRouter } from './login';
import { signupRouter } from './signup';
import { usersRouter } from './users';
import { productsRouter } from './products';

const router: Router = Router();
const apiURL: string = process.env.API_URL;
const routers: Router[] = [
    loginRouter,
    signupRouter,
    usersRouter,
    productsRouter
];

router.use(apiURL, routers);

export default router;
