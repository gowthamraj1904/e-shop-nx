import { Router } from 'express';
import { usersController } from '@server/controllers';

const usersRouter: Router = Router();
const apiURL = process.env.API_URL;

usersRouter.get(`${apiURL}/users`, usersController.getUsers);
usersRouter.get(`${apiURL}/users/:id`, usersController.getUserById);
usersRouter.post(`${apiURL}/users`, usersController.addUser);
usersRouter.put(`${apiURL}/users/:id`, usersController.updateUser);
usersRouter.delete(`${apiURL}/users/:id`, usersController.deleteUser);

export { usersRouter };
