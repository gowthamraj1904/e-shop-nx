import mongoose from 'mongoose';
import logger from './lib/logger';

export default class Database {
    public connect(): void {
        const connectionString: string = process.env.CONNECTION_STRING;
        const dbName: string = process.env.DB_NAME;
        const connectionOptions: Record<string, boolean | string> = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: dbName
        };

        mongoose
            .connect(connectionString, connectionOptions)
            .then(this.dbSuccess)
            .catch(this.dbError);
    }

    private dbSuccess(): void {
        logger.info('Database connected successfully!');
    }

    private dbError(error: Error): void {
        logger.error('Database Connection failed: reason:', error.message);
        logger.error(error.stack);

        throw error;
    }
}
