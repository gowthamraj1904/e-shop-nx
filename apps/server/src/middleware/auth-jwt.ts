import { Request } from 'express';
import { expressjwt, Params } from 'express-jwt';
import * as CONSTANTS from '../constants';

type ExcludeApi = string | { url: RegExp; methods?: string[] };

// TODO - Add token type
const isRevoked = async (req: Request, token): Promise<boolean> => {
    return !token.payload?.isAdmin;
};

function getExcludeApiList(): ExcludeApi[] {
    const api: string = CONSTANTS.API_URL;
    const productsImageUrlRegExp: RegExp = /\/public\/uploads(.*)/;
    const productsUrlRegExp: RegExp = /\/api\/v1\/products(.*)/;
    const categoriesUrlRegExp: RegExp = /\/api\/v1\/categories(.*)/;
    const apiSwaggerUrlRegExp: RegExp = /\/api-docs(.*)/;
    const statusSwaggerUrlRegExp: RegExp = /\/status-docs(.*)/;
    const systemStatusUrlRegExp: RegExp = /\/status(.*)/;
    // const allowAll: RegExp = /(.*)/;

    const excludeApis: ExcludeApi[] = [
        `${api}/login`,
        `${api}/signup`,
        {
            url: productsImageUrlRegExp,
            methods: ['GET', 'OPTIONS']
        },
        {
            url: categoriesUrlRegExp,
            methods: ['GET', 'OPTIONS']
        },
        {
            url: productsUrlRegExp,
            methods: ['GET', 'OPTIONS']
        },
        {
            url: systemStatusUrlRegExp,
            methods: ['GET', 'OPTIONS']
        },
        {
            url: apiSwaggerUrlRegExp,
            methods: ['GET', 'OPTIONS']
        },
        {
            url: statusSwaggerUrlRegExp,
            methods: ['GET', 'OPTIONS']
        }
        // { url: allowAll } // Allow all the APIs
    ];

    return excludeApis;
}

function authJwt() {
    const secret: string = process.env.SECRET_KEY;
    const excludeApis: ExcludeApi[] = getExcludeApiList();
    const jwtOptions: Params = {
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    };

    return expressjwt(jwtOptions).unless({
        path: excludeApis // Exclude these APIs from authorization
    });
}

export { authJwt };
