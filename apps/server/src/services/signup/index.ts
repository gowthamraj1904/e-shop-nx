import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { IUser } from '@libs/shared/interfaces';
import { UserSchema } from '@server/schemas';
import { ISignupApiResponse } from '@server/models';

async function signup(req: Request): Promise<ISignupApiResponse> {
    let response: ISignupApiResponse;

    try {
        const {
            name,
            email,
            password,
            phone,
            isAdmin,
            street,
            apartment,
            city,
            zip,
            country,
            profilePhoto
        } = req.body;
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const user: IUser = {
            name,
            email,
            passwordHash,
            phone,
            isAdmin,
            street,
            apartment,
            city,
            zip,
            country,
            profilePhoto
        };
        const newUser = new UserSchema(user);
        const savedUser: IUser = await newUser.save();

        if (savedUser) {
            response = {
                status: 200,
                message: 'User created successfully',
                user: savedUser
            };
        } else {
            response = {
                status: 400,
                message: 'The User cannot be created'
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

export { signup };
