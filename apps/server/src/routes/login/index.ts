import { Router } from 'express';
import { loginController } from '@server/controllers';

const loginRouter: Router = Router();

loginRouter.post('/login', loginController.login);

export { loginRouter };
