import { Request, Response } from 'express';
import { SignupService } from '@server/services';
import { ISignupApiResponse } from '@server/models';

async function signup(req: Request, res: Response): Promise<Response> {
    const response: ISignupApiResponse = await SignupService.signup(req);

    return res.json(response);
}

export { signup };
