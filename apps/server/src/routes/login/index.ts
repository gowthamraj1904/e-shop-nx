import { Router } from 'express';
import { loginController } from '@server/controllers';

const loginRouter: Router = Router();
const apiURL = process.env.API_URL;

loginRouter.post(`${apiURL}/login`, loginController.login);

export { loginRouter };
