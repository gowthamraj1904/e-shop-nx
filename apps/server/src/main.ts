import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as path from 'path';
import router from '@server/routes';
import { authJwt, errorHandler, logger } from './middlewares';
import { corsOptions } from './utils';

const app: Express = express();

const port: string | number = process.env.PORT;
const connectionString: string = process.env.CONNECTION_STRING;
const dbName: string = process.env.DB_NAME;

app.use(cors(corsOptions));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static('public'));
// JWT Token Authentication
app.use(authJwt());
// Logger
app.use(logger);
// Router
app.use(router);
// Error Handler
app.use(errorHandler);

function dbConnection(): void {
    const connectionOptions: Record<string, boolean | string> = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: dbName
    };

    mongoose
        .connect(connectionString, connectionOptions)
        .then((): void => {
            console.log('Database connected successfully!');
        })
        .catch((error: Error): void => {
            throw error.message;
        });
}

function startServer(): void {
    const server = app.listen(port, () =>
        console.log(`Server running on http://localhost:${port}/api/v1`)
    );

    server.on('error', console.error);
}

function main(): void {
    startServer();
    dbConnection();
}

main();
