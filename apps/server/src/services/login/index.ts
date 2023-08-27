import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextFunction, Request } from 'express';
import { IUser } from '@libs/shared/interfaces';
import { UserSchema } from '@server/schemas';
import { ILoginApiResponse } from '@server/models';
import { JWT_EXPIRY } from '../../constants';

async function validateUser(
    user: IUser,
    password: string
): Promise<ILoginApiResponse> {
    let response: ILoginApiResponse;

    if (user && bcrypt.compareSync(password, user.passwordHash)) {
        // SECRET is custom secret code for JWT
        const secret: string = process.env.SECRET;
        const payload: Record<string, string | boolean> = {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
        };
        const jwtOptions: Record<string, string> = {
            expiresIn: JWT_EXPIRY
        };
        const token: string = jwt.sign(payload, secret, jwtOptions);

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

async function login(
    req: Request,
    next: NextFunction
): Promise<ILoginApiResponse> {
    try {
        const { email, password } = req.body;
        let response: ILoginApiResponse;

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

        return response;
    } catch (error: unknown) {
        next(error);
    }
}

export { login };
