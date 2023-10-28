import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import path from 'path';
import { AddressInfo } from 'net';
import Environment from './environments/environment';
import { setGlobalEnvironment } from './global';
import { corsOptions } from './utils';
import { authJwt } from './middleware';
import addErrorHandler from './middleware/error-handler';
import logger from './lib/logger';
import Database from './database';
import Routes from '@server/routes';

export default class App {
    readonly express: Application;

    private httpServer: http.Server;

    readonly env: Environment;

    readonly routes: Routes;

    constructor() {
        this.express = express();
        this.httpServer = http.createServer(this.express);
        this.env = new Environment();
        this.routes = new Routes();
    }

    private async main(): Promise<void> {
        setGlobalEnvironment(this.env);
        this.routes.init();

        this.middleware();
        this.express.use(this.routes.router);
        this.express.use(addErrorHandler);
    }

    private middleware(): void {
        this.express.use(helmet({ contentSecurityPolicy: false }));
        this.express.use(express.json({ limit: '100mb' }));
        this.express.use(
            express.urlencoded({ limit: '100mb', extended: true })
        );
        this.express.use(cors(corsOptions));
        this.express.use(
            '/assets',
            express.static(path.join(__dirname, 'assets'))
        );
        this.express.use(express.static('public'));
        // this.express.use(authJwt());
    }

    private serverError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        // handle specific error codes here.
        throw error;
    }

    private serverListening(): void {
        const addressInfo: AddressInfo = <AddressInfo>this.httpServer.address();

        logger.info(`Listening on ${addressInfo.address}:${this.env.port}`);
    }

    private connectDatabase(): void {
        const database: Database = new Database();
        database.connect();
    }

    private appStart(): void {
        this.express.set('port', this.env.port);

        this.httpServer.on('error', (error: NodeJS.ErrnoException) =>
            this.serverError(error)
        );
        this.httpServer.on('listening', () => this.serverListening());
        this.httpServer.listen(this.env.port);

        this.connectDatabase();
    }

    private appError(error: Error): void {
        logger.info('app.init error');
        logger.error(error.name);
        logger.error(error.message);
        logger.error(error.stack);
    }

    public init(): void {
        this.main()
            .then(() => this.appStart())
            .catch((error: Error) => this.appError(error));
    }
}
