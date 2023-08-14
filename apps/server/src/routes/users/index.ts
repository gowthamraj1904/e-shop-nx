import { Router } from 'express';
import { usersController } from '@server/controllers';

const usersRouter: Router = Router();

usersRouter.get('/users', usersController.getUsers);
usersRouter.get('/users/:id', usersController.getUserById);
usersRouter.post('/users', usersController.addUser);
usersRouter.put('/users/:id', usersController.updateUser);
usersRouter.delete('/users/:id', usersController.deleteUser);

export { usersRouter };
