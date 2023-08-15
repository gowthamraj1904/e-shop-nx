import { NextFunction, Request, Response } from 'express';
import { SignupService } from '@server/services';
import { ISignupApiResponse } from '@server/models';

async function signup(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> {
    const response: ISignupApiResponse = await SignupService.signup(req, next);

    if (response) {
        return res.json(response);
    }
}

export { signup };
