import { Request, Response } from 'express';
import { bcrypt } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userSchema } from '@server/models';
import { User } from '@libs/shared/interfaces';

async function login(req: Request, res: Response): Promise<void> {
    const filter = {
        email: req.body.email
    };

    await userSchema
        .findOne(filter)
        .then((user: User) => {
            if (
                user &&
                bcrypt.compareSync(req.body.password, user.passwordHash)
            ) {
                // SECRET is custom secret code for JWT
                const secret = process.env.SECRET;
                const token = jwt.sign(
                    // Keep these user details in the token
                    {
                        userId: user.id,
                        email: user.email,
                        userName: user.name,
                        isAdmin: user.isAdmin
                    },
                    secret,
                    {
                        expiresIn: '1d' // Will expire in 1 day
                    }
                );

                // If user is authenticated, will send token in the response
                const response = {
                    user: user.email,
                    token: token
                };

                res.status(200).send(response);
            } else {
                const response = {
                    message: 'Invalid password'
                };

                res.status(400).json(response);
            }
        })
        .catch((error: Error) => {
            const response = {
                message: 'The User not found',
                error
            };

            res.status(400).json(response);
        });
}

export { login };
