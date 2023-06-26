import { Request, Response } from 'express';
import { bcrypt } from 'bcrypt';
import { userSchema } from '@server/models';
import { User } from '@libs/shared/interfaces';

async function signup(req: Request, res: Response): Promise<void> {
    const user = {
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        profilePhoto: req.body.profilePhoto
    };
    const newUser = new userSchema(user);

    await newUser
        .save()
        .then((user: User) => {
            res.status(200).send(user);
        })
        .catch((error: Error) => {
            const response = {
                message: 'The User cannot be created',
                error
            };

            res.status(400).json(response);
        });
}

export { signup };
