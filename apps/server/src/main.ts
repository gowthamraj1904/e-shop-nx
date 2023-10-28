import App from './app';
import logger from './lib/logger';

const app: App = new App();

app.init();

function unhandledRejection(error: Error): void {
    logger.error('Unhandled Promise Rejection: reason:', error.message);
    logger.error(error.stack);
}

function uncaughtException(error: Error): void {
    logger.error('Uncaught Exception: reason:', error.message);
    logger.error(error.stack);
}

process.on('unhandledRejection', unhandledRejection);

process.on('uncaughtException', uncaughtException);
