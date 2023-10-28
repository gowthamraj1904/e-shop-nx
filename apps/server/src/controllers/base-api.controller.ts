import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Crypto from '../lib/crypto';
import logger from '../lib/logger';

export default abstract class BaseApiController {
    protected router: Router;

    protected constructor() {
        this.router = Router();
    }

    public send(res: Response, statusCode: number = StatusCodes.OK): void {
        let obj = {};
        obj = res.locals.data;

        if (
            environment.isProductionEnvironment() ||
            environment.isTestEnvironment()
        ) {
            logger.info(JSON.stringify(obj, null, 2));
        }

        if (environment.applyEncryption) {
            obj = Crypto.encrypt(JSON.stringify(obj), environment.secretKey);
        }

        res.status(statusCode).send(obj);
    }
}
