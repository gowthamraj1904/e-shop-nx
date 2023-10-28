import { NextFunction, Request, Response, Router } from 'express';
import SignupController from '@server/controllers/signup.controller';

function signupRouter(): Router {
    const router: Router = Router();
    const signupController: SignupController = new SignupController();

    router.post('/signup', (req: Request, res: Response, next: NextFunction) =>
        signupController.signup(req, res, next)
    );

    return router;
}

export default signupRouter;
