import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSwaggerDoc from '../swagger/api-swagger.json';
import statusSwaggerDoc from '../swagger/status-swagger.json';

function swaggerRouter(): Router {
    const router: Router = Router();
    const options: Record<string, boolean> = {
        explorer: true
    };

    router.use('/api-docs', swaggerUi.serveFiles(apiSwaggerDoc));
    router.get('/api-docs', swaggerUi.setup(apiSwaggerDoc, options));

    router.use('/status-docs', swaggerUi.serveFiles(statusSwaggerDoc));
    router.get('/status-docs', swaggerUi.setup(statusSwaggerDoc, options));

    return router;
}

export default swaggerRouter;
