import { NextFunction, Response } from 'express';

enum HttpCode {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

interface AppErrorArgs {
    name?: string;
    httpCode: HttpCode;
    description: string;
    isOperational?: boolean;
}

class AppError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpCode;
    public readonly isOperational: boolean = true;

    constructor(args: AppErrorArgs) {
        super(args.description);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = args.name || 'Error';
        this.httpCode = args.httpCode;

        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }

        Error.captureStackTrace(this);
    }
}

class ErrorHandler {
    private isTrustedError(error: Error): boolean {
        if (error instanceof AppError) {
            return error.isOperational;
        }

        return false;
    }

    private handleTrustedError(error: AppError, response: Response): void {
        response.status(error.httpCode).json({ message: error.message });
    }

    private handleCriticalError(
        error: Error | AppError,
        response?: Response
    ): void {
        console.log({ error, response });
        if (response) {
            response
                .status(HttpCode.INTERNAL_SERVER_ERROR)
                .json({ message: 'Internal server error' });
        }

        console.log('Application encountered a critical error. Exiting');
        process.exit(1);
    }

    public handleError(
        error: Error | AppError,
        response?: Response,
        next?: NextFunction
    ): void {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error as AppError, response);
        } else {
            this.handleCriticalError(error, response);
        }
    }
}

const errorHandler: ErrorHandler = new ErrorHandler();

export { HttpCode, AppErrorArgs, AppError, errorHandler };

//
// // Error object used in error handling middleware function
// class AppError1 extends Error {
//     statusCode: number;
//
//     constructor(statusCode: number, message: string) {
//         super(message);
//
//         Object.setPrototypeOf(this, new.target.prototype);
//         this.name = Error.name;
//         this.statusCode = statusCode;
//         Error.captureStackTrace(this);
//     }
// }
//
// // Middleware function for logging the request method and request URL
// function requestLogger(
//     request: Request,
//     response: Response,
//     next: NextFunction
// ) {
//     console.log(`requestLogger: ${request.method} url:: ${request.url}`);
//     next();
// }
//
// // Error handling Middleware function for logging the error message
// function errorLogger(
//     error: Error,
//     request: Request,
//     response: Response,
//     next: NextFunction
// ) {
//     console.log(`errorLogger: error ${error.message}`);
//     next(error); // calling next middleware
// }
//
// // Error handling Middleware function reads the error message
// // and sends back a response in JSON format
// function errorResponder(
//     error: AppError,
//     request: Request,
//     response: Response,
//     next: NextFunction
// ) {
//     console.log(`errorResponder: ${error.message}`);
//     response.header('Content-Type', 'application/json');
//
//     const status = error.statusCode || 400;
//     response.status(status).send(error.message);
// }
//
// // Fallback Middleware function for returning
// // 404 error for undefined paths
// function invalidPathHandler(
//     request: Request,
//     response: Response,
//     next: NextFunction
// ) {
//     console.log(`invalidPathHandler:`);
//     response.status(404);
//     response.send('invalid path');
// }
//
// function requireJsonContent(
//     request: Request,
//     response: Response,
//     next: NextFunction
// ) {
//     console.log(`requireJsonContent:`);
//     if (request.headers['content-type'] !== 'application/json') {
//         response.status(400).send('Server requires application/json');
//     } else {
//         next();
//     }
// }
//
// function errorHandler(
//     error: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     console.log(`errorHandler: ${error.message}`);
//     const errStatus = error.statusCode || 500;
//     const errMsg = error.message || 'Something went wrong';
//     res.status(errStatus).json({
//         success: false,
//         status: errStatus,
//         message: errMsg,
//         stack: error.stack
//     });
//
//     if (error.name === 'UnauthorizedError') {
//         // Jwt authentication error
//         return res.status(401).json({
//             message: 'The user is not authorized',
//             error
//         });
//     }
//
//     if (error.name === 'ValidationError') {
//         // Validation error
//         return res.status(422).json({
//             message: 'Validation Error',
//             error
//         });
//     }
//
//     // Default to 500 server error
//     return res.status(500).json({
//         message: 'Server Error',
//         error
//     });
// }
//
// export {
//     AppError,
//     requestLogger,
//     errorLogger,
//     errorResponder,
//     invalidPathHandler,
//     requireJsonContent,
//     errorHandler
// };
