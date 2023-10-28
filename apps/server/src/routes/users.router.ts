import { NextFunction, Request, Response, Router } from 'express';
import UsersController from '@server/controllers/users.controller';

function usersRouter(): Router {
    const router: Router = Router();
    const usersController: UsersController = new UsersController();

    // router.route('/').get(usersController.getUsers).put().delete().post();
    router.get('/users', (req: Request, res: Response, next: NextFunction) =>
        usersController.getUsers(req, res, next)
    );
    router.get('/user/:id', (req: Request, res: Response, next: NextFunction) =>
        usersController.getUserById(req, res, next)
    );
    router.post('/user', (req: Request, res: Response, next: NextFunction) =>
        usersController.addUser(req, res, next)
    );
    router.put('/user/:id', (req: Request, res: Response, next: NextFunction) =>
        usersController.updateUser(req, res, next)
    );
    router.delete(
        '/user/:id',
        (req: Request, res: Response, next: NextFunction) =>
            usersController.deleteUser(req, res, next)
    );

    return router;
}

export default usersRouter;
