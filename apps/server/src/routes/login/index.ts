import { Router } from 'express';
import { loginController } from '@server/controllers';
import { logger } from '../../middlewares';

const loginRouter: Router = Router();

loginRouter.post('/login', [logger], loginController.login);

export { loginRouter };
