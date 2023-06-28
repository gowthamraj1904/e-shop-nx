import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { userSchema } from '@server/models';
import { User } from '@libs/shared/interfaces';

async function getUsers(req: Request, res: Response): Promise<void> {
    await userSchema
        .find()
        .select('-passwordHash')
        .then((users: User[]) => {
            res.status(200).send(users);
        })
        .catch((error: Error) => {
            const response = {
                message: 'Users are empty',
                error
            };

            res.status(400).json(response);
        });
}

async function getUserById(req: Request, res: Response): Promise<void> {
    await userSchema
        .findById(req.params.id)
        .select('-passwordHash')
        .then((user: User) => {
            res.status(200).send(user);
        })
        .catch((error: Error) => {
            const response = {
                message: 'userSchema is empty',
                error
            };

            res.status(400).json(response);
        });
}

async function addUser(req: Request, res: Response): Promise<void> {
    const body: User = req.body;
    const user = {
        name: body.name,
        email: body.email,
        passwordHash: bcrypt.hashSync(body.password, 10),
        phone: body.phone,
        isAdmin: body.isAdmin,
        street: body.street,
        apartment: body.apartment,
        city: body.city,
        zip: body.zip,
        country: body.country
    };

    await new userSchema(user)
        .save()
        .then(async (user: User) => {
            const users: User[] = await userSchema.find();

            res.status(201).send({ user, users });
        })
        .catch((error: Error) => {
            const response = {
                message: 'The userSchema cannot be created',
                error
            };

            res.status(400).json(response);
        });
}

async function updateUser(req: Request, res: Response): Promise<void> {
    const {
        params: { id },
        body
    } = req;

    await userSchema
        .findByIdAndUpdate({ _id: id }, body)
        .then(async (updatedUser: User) => {
            const users: User[] = await userSchema.find();

            res.status(200).send({ user: updatedUser, users });
        })
        .catch((error: Error) => {
            const response = {
                message: 'The userSchema cannot be updated',
                error
            };

            res.status(400).json(response);
        });
}

async function deleteUser(req: Request, res: Response): Promise<void> {
    await userSchema
        .findByIdAndRemove(req.params.id)
        .then(async () => {
            const users: User[] = await userSchema.find();
            const response = {
                message: 'The user is deleted',
                users
            };

            res.status(200).json(response);
        })
        .catch((error: Error) => {
            const response = {
                message: 'The user is not deleted',
                error
            };

            res.status(400).json(response);
        });
}

export { getUsers, getUserById, addUser, updateUser, deleteUser };
