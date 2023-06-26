import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as path from 'path';
import {
    usersRouter,
    productsRouter,
    loginRouter,
    signupRouter
} from '@server/routes';
import { errorHandler } from './helpers/error-handler';
import { authJwt } from './helpers/jwt';

const app = express();

const port: string | number = process.env.PORT;
const connectionString: string = process.env.CONNECTION_STRING;
const dbName: string = process.env.DB_NAME;
const connectionOptions: Record<string, boolean | string> = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName
};

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static('public'));
// JWT Token Authentication
app.use(authJwt());
// Error Handler
app.use(errorHandler);
// Router
app.use(usersRouter);
app.use(productsRouter);
app.use(loginRouter);
app.use(signupRouter);

mongoose
    .connect(connectionString, connectionOptions)
    .then((): void => {
        const server = app.listen(port, () =>
            console.log(`Server running on http://localhost:${port}/api/v1`)
        );
        server.on('error', console.error);
    })
    .catch((error: unknown): void => {
        throw error;
    });
