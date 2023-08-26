import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../swagger/swagger.json';

const swaggerRouter: Router = Router();
const options = {
    explorer: true
};

swaggerRouter.use('/api-docs', swaggerUi.serve);
swaggerRouter.get('/api-docs', swaggerUi.setup(swaggerDoc, options));

export { swaggerRouter };
