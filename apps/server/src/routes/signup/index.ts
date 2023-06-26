import { Router } from 'express';
import { signupController } from '@server/controllers';

const signupRouter: Router = Router();
const apiURL = process.env.API_URL;

signupRouter.post(`${apiURL}/signup`, signupController.signup);

export { signupRouter };
