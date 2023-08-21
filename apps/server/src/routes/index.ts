import { Router } from 'express';
import { loginRouter } from './login';
import { signupRouter } from './signup';
import { usersRouter } from './users';
import { productsRouter } from './products';
import * as CONSTANTS from '../constants';

const router: Router = Router();
const apiURL: string = CONSTANTS.API_URL;

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

const routers: Router[] = [
    loginRouter,
    signupRouter,
    usersRouter,
    productsRouter
];

router.use(apiURL, routers);

export default router;
