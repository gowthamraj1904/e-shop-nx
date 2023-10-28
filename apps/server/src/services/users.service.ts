import * as bcrypt from 'bcrypt';
import { NextFunction, Request } from 'express';
import { IUser } from '@libs/shared/interfaces';
import { UserSchema } from '@server/schemas';
import { IUserApiResponse } from '@server/models';

export default class UsersService {
    public async getUsers(next: NextFunction): Promise<IUserApiResponse> {
        try {
            const users: IUser[] = await UserSchema.find().select(
                '-passwordHash'
            );

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

    public async getUserById(
        req: Request,
        next: NextFunction
    ): Promise<IUserApiResponse> {
        try {
            let response: IUserApiResponse;
            const { id } = req.params;
            const user: IUser = await UserSchema.findById(id).select(
                '-passwordHash'
            );
            // const userN: IUser = await UserSchema.where('id')
            //     .equals(id)
            //     .select('-passwordHash')
            //     .limit(2);

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

    public async addUser(
        req: Request,
        next: NextFunction
    ): Promise<IUserApiResponse> {
        try {
            const {
                name,
                email,
                password,
                phone,
                dob,
                isAdmin,
                address,
                profilePhoto
            } = req.body;
            const passwordHash = bcrypt.hashSync(password, 10);
            const user: IUser = {
                name,
                email,
                passwordHash,
                phone,
                dob,
                isAdmin,
                address,
                profilePhoto
            };

            // const savedUser: IUser = await new UserSchema(user).save();
            const savedUser: IUser = await UserSchema.create(user);
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

    public async updateUser(
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

    public async deleteUser(
        req: Request,
        next: NextFunction
    ): Promise<IUserApiResponse> {
        try {
            const { id } = req.params;
            const isMultipleIds = id.includes(',');

            if (isMultipleIds) {
                const ids = id.split(',');

                await UserSchema.deleteMany({ _id: { $in: ids } });
            } else {
                await UserSchema.findByIdAndRemove(id);
            }

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
}
