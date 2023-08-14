import { Request, Response } from 'express';
import { LoginService } from '@server/services';
import { ILoginApiResponse } from '@server/models';

async function login(req: Request, res: Response): Promise<Response> {
    const response: ILoginApiResponse = await LoginService.login(req);

    return res.json(response);
}

export { login };
