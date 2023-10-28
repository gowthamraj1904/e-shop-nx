import { NextFunction, Request, Response, Router } from 'express';
import SystemStatusController from '@server/controllers/system-status.controller';

function systemStatusRouter(): Router {
    const router: Router = Router();
    const systemStatusController: SystemStatusController =
        new SystemStatusController();

    router.get('/system', (req: Request, res: Response, next: NextFunction) =>
        systemStatusController.getSystemInfo(req, res, next)
    );
    router.get('/time', (req: Request, res: Response, next: NextFunction) =>
        systemStatusController.getServerTime(req, res, next)
    );
    router.get('/usage', (req: Request, res: Response, next: NextFunction) =>
        systemStatusController.getResourceUsage(req, res, next)
    );
    router.get('/process', (req: Request, res: Response, next: NextFunction) =>
        systemStatusController.getProcessInfo(req, res, next)
    );
    router.get('/error', (req: Request, res: Response, next: NextFunction) =>
        systemStatusController.getError(req, res, next)
    );

    return router;
}

export default systemStatusRouter;
