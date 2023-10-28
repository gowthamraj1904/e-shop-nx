import { NextFunction, Request, Response } from 'express';
import UsersService from '@server/services/users.service';
import { IUserApiResponse } from '@server/models';
import BaseApiController from '@server/controllers/base-api.controller';

export default class UsersController extends BaseApiController {
    private usersService: UsersService;

    constructor() {
        super();

        this.usersService = new UsersService();
    }

    public async getUsers(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            console.log(this);
            const response: IUserApiResponse = await this.usersService.getUsers(
                next
            );

            res.locals.data = response;
            super.send(res);
        } catch (error) {
            next(error);
        }
    }

    public async getUserById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response: IUserApiResponse =
                await this.usersService.getUserById(req, next);

            res.locals.data = response;
            super.send(res);
        } catch (error) {
            next(error);
        }
    }

    public async addUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response: IUserApiResponse = await this.usersService.addUser(
                req,
                next
            );

            res.locals.data = response;
            super.send(res);
        } catch (error) {
            next(error);
        }
    }

    public async updateUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response: IUserApiResponse =
                await this.usersService.updateUser(req, next);

            res.locals.data = response;
            super.send(res);
        } catch (error) {
            next(error);
        }
    }

    public async deleteUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response: IUserApiResponse =
                await this.usersService.deleteUser(req, next);

            res.locals.data = response;
            super.send(res);
        } catch (error) {
            next(error);
        }
    }
}
