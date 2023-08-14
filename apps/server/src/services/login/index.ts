import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { IUser } from '@libs/shared/interfaces';
import { UserSchema } from '@server/schemas';
import { ILoginApiResponse } from '@server/models';

async function validateUser(
    user: IUser,
    password: string
): Promise<ILoginApiResponse> {
    let response: ILoginApiResponse;

    if (user && bcrypt.compareSync(password, user.passwordHash)) {
        // SECRET is custom secret code for JWT
        const secret: string = process.env.SECRET;
        const token: string = jwt.sign(
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
        response = {
            status: 200,
            message: 'Success',
            user: user.email,
            token: token
        };
    } else {
        response = {
            status: 400,
            message: 'Invalid password'
        };
    }

    return response;
}

async function login(req: Request): Promise<ILoginApiResponse> {
    let response: ILoginApiResponse;

    try {
        const { email, password } = req.body;

        const filter: { email: string } = {
            email
        };

        const user: IUser = await UserSchema.findOne(filter);

        if (user) {
            response = await validateUser(user, password);
        } else {
            response = {
                status: 400,
                message: 'The User not found'
            };
        }
    } catch (error: unknown) {
        response = {
            status: 400,
            message: 'error',
            error
        };
    }

    return response;
}

export { login };
