import { Router } from 'express';
import loginRouter from './login.router';
import signupRouter from './signup.router';
import usersRouter from './users.router';
import categoriesRouter from './categories.router';
import productsRouter from './products.router';
import ordersRouter from './orders.router';
import orderItemsRouter from './order-items.router';
import systemStatusRouter from './system-status.router';
import swaggerRouter from './swagger.router';
import * as CONSTANTS from '../constants';

// router.get(
//     '/next',
//     (req, res, next) => {
//         res.status(404);
//         next();
//     },
//     (req, res) => {
//         res.send('Api not found');
//     }
// );

// function one(req, res, next) {
//     console.log('one');
//     next();
// }
//
// function two(req, res) {
//     console.log('one');
//     res.send('Chain finished');
// }
//
// router.get('/chain', [one, two]);

// router.get('/*', (req, res) => {
//     res.status(404).send('API not found');
// });

export default class Routes {
    private routers: Router[];

    public router: Router = Router();

    private apiURL: string = CONSTANTS.API_URL;

    private setRoutes(): void {
        this.routers = [
            loginRouter(),
            signupRouter(),
            usersRouter(),
            categoriesRouter(),
            productsRouter(),
            ordersRouter(),
            orderItemsRouter()
        ];

        this.router.use(this.apiURL, this.routers);
        this.router.use('/status', systemStatusRouter());

        if (environment.isDevEnvironment() || environment.isTestEnvironment()) {
            this.router.use(swaggerRouter());
        }
    }

    public init(): void {
        this.setRoutes();
    }
}
