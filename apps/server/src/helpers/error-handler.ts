import { NextFunction, Request, Response } from 'express';

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error.name === 'UnauthorizedError') {
        // Jwt authentication error
        return res.status(401).json({
            message: 'The user is not authorized',
            error
        });
    }

    if (error.name === 'ValidationError') {
        // Validation error
        return res.status(422).json({
            message: 'Validation Error',
            error
        });
    }

    // Default to 500 server error
    return res.status(500).json({
        message: 'Server Error',
        error
    });
}
