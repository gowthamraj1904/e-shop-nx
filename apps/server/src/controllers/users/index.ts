import { NextFunction, Request, Response } from 'express';
import { UsersService } from '@server/services';
import { IUserApiResponse } from '@server/models';

async function getUsers(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> {
    const response: IUserApiResponse = await UsersService.getUsers(next);

    if (response) {
        return res.json(response);
    }
}

async function getUserById(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> {
    const response: IUserApiResponse = await UsersService.getUserById(
        req,
        next
    );

    if (response) {
        return res.json(response);
    }
}

async function addUser(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> {
    const response: IUserApiResponse = await UsersService.addUser(req, next);

    if (response) {
        return res.json(response);
    }
}

async function updateUser(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> {
    const response: IUserApiResponse = await UsersService.updateUser(req, next);

    if (response) {
        return res.json(response);
    }
}

async function deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> {
    const response: IUserApiResponse = await UsersService.deleteUser(req, next);

    if (response) {
        return res.json(response);
    }
}

export { getUsers, getUserById, addUser, updateUser, deleteUser };
