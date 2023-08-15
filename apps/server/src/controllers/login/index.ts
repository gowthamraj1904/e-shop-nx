import { NextFunction, Request, Response } from 'express';
import { LoginService } from '@server/services';
import { ILoginApiResponse } from '@server/models';

async function login(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> {
    const response: ILoginApiResponse = await LoginService.login(req, next);

    if(response) {
        return res.json(response);
    }
}

export { login };
