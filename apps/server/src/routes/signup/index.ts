import { Router } from 'express';
import { signupController } from '@server/controllers';

const signupRouter: Router = Router();

signupRouter.post('/signup', signupController.signup);

export { signupRouter };
