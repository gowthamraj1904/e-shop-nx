import { NextFunction, Request, Response } from 'express';
import LoginService from '@server/services/login.service';
import { ILoginApiResponse } from '@server/models';
import BaseApiController from '@server/controllers/base-api.controller';

export default class LoginController extends BaseApiController {
    readonly loginService: LoginService;

    constructor() {
        super();

        this.loginService = new LoginService();
    }

    public async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response: ILoginApiResponse = await this.loginService.login(
                req,
                next
            );

            res.locals.data = response;
            super.send(res);
        } catch (error) {
            next(error);
        }
    }
}
