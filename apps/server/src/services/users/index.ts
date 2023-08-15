import * as bcrypt from 'bcrypt';
import { NextFunction, Request } from 'express';
import { IUser } from '@libs/shared/interfaces';
import { UserSchema } from '@server/schemas';
import { IUserApiResponse } from '@server/models';

async function getUsers(next: NextFunction): Promise<IUserApiResponse> {
    try {
        const users: IUser[] = await UserSchema.find().select('-passwordHash');

        const response: IUserApiResponse = {
            status: 200,
            message: 'Success',
            users
        };

        return response;
    } catch (error: unknown) {
        next(error);
    }
}

async function getUserById(
    req: Request,
    next: NextFunction
): Promise<IUserApiResponse> {
    try {
        let response: IUserApiResponse;
        const { id } = req.params;
        const user: IUser = await UserSchema.findById(id).select(
            '-passwordHash'
        );

        if (user) {
            response = {
                status: 200,
                message: 'Success',
                user
            };
        } else {
            response = {
                status: 400,
                message: 'User not found'
            };
        }

        return response;
    } catch (error: unknown) {
        next(error);
    }
}

async function addUser(
    req: Request,
    next: NextFunction
): Promise<IUserApiResponse> {
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
            country
        } = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);
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
            country
        };

        const savedUser: IUser = await new UserSchema(user).save();
        const users: IUser[] = await UserSchema.find();

        const response: IUserApiResponse = {
            status: 200,
            message: 'Success',
            user: savedUser,
            users
        };

        return response;
    } catch (error: unknown) {
        next(error);
    }
}

async function updateUser(
    req: Request,
    next: NextFunction
): Promise<IUserApiResponse> {
    try {
        const { id } = req.params;
        const { body } = req;

        const updatedUser: IUser = await UserSchema.findByIdAndUpdate(
            { _id: id },
            body
        );
        const users: IUser[] = await UserSchema.find();

        const response: IUserApiResponse = {
            status: 200,
            message: 'Success',
            user: updatedUser,
            users
        };

        return response;
    } catch (error: unknown) {
        next(error);
    }
}

async function deleteUser(
    req: Request,
    next: NextFunction
): Promise<IUserApiResponse> {
    try {
        await UserSchema.findByIdAndRemove(req.params.id);
        const users: IUser[] = await UserSchema.find();

        const response: IUserApiResponse = {
            status: 200,
            message: 'The user is deleted',
            users
        };

        return response;
    } catch (error: unknown) {
        next(error);
    }
}

export { getUsers, getUserById, addUser, updateUser, deleteUser };
