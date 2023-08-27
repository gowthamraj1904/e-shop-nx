import { Router } from 'express';
import { usersController } from '@server/controllers';

const usersRouter: Router = Router();

// usersRouter.route('/').get(usersController.getUsers).put().delete().post();
usersRouter.get('/users', usersController.getUsers);
usersRouter.get('/user/:id', usersController.getUserById);
usersRouter.post('/user', usersController.addUser);
usersRouter.put('/user/:id', usersController.updateUser);
usersRouter.delete('/user/:id', usersController.deleteUser);

export { usersRouter };
