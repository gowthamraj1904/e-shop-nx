import * as CONSTANTS from '../../constants';

const corsOptions = {
    origin: (
        origin: string,
        callback: (arg0: Error, arg1?: boolean) => void
    ): void => {
        if (!origin || CONSTANTS.ORIGIN_WHITELIST.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

export { corsOptions };
