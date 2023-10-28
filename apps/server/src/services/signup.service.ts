import { NextFunction, Request } from 'express';
import * as bcrypt from 'bcrypt';
import { IUser } from '@libs/shared/interfaces';
import { UserSchema } from '@server/schemas';
import { ISignupApiResponse } from '@server/models';

export default class SignupService {
    public async signup(
        req: Request,
        next: NextFunction
    ): Promise<ISignupApiResponse> {
        try {
            let response: ISignupApiResponse;
            const {
                name,
                email,
                password,
                phone,
                isAdmin,
                address,
                profilePhoto
            } = req.body;
            const passwordHash = bcrypt.hashSync(
                password,
                bcrypt.genSaltSync(10)
            );
            const user: IUser = {
                name,
                email,
                passwordHash,
                phone,
                isAdmin,
                address,
                profilePhoto
            };
            const newUser: IUser = await UserSchema.create(user);

            if (newUser) {
                response = {
                    status: 200,
                    message: 'User created successfully',
                    user: newUser
                };
            } else {
                response = {
                    status: 400,
                    message: 'The User cannot be created'
                };
            }

            return response;
        } catch (error: unknown) {
            next(error);
        }
    }
}
