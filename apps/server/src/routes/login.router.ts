import { NextFunction, Request, Response, Router } from 'express';
import LoginController from '@server/controllers/login.controller';

function loginRouter(): Router {
    const router: Router = Router();
    const loginController: LoginController = new LoginController();

    router.post('/login', (req: Request, res: Response, next: NextFunction) =>
        loginController.login(req, res, next)
    );

    return router;
}

export default loginRouter;
