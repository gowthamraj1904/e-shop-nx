import { NextFunction, Request, Response } from 'express';
import SignupService from '@server/services/signup.service';
import { ISignupApiResponse } from '@server/models';
import BaseApiController from '@server/controllers/base-api.controller';

export default class SignupController extends BaseApiController {
    readonly signupService: SignupService;

    constructor() {
        super();

        this.signupService = new SignupService();
    }

    public async signup(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response: ISignupApiResponse =
                await this.signupService.signup(req, next);

            res.locals.data = response;
            super.send(res);
        } catch (error) {
            next(error);
        }
    }
}
