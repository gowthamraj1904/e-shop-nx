import { Request } from 'express';
import { expressjwt, Params } from 'express-jwt';

type ExcludeApi = string | { url: RegExp; methods: string[] };

// TODO - Add token type
const isRevoked = async (req: Request, token): Promise<boolean> => {
    return !token.payload?.isAdmin;
};

function getApiList(): ExcludeApi[] {
    const api: string = process.env.API_URL;
    const productsImageUrlRegExp: RegExp = /\/public\/uploads(.*)/;
    const productsUrlRegExp: RegExp = /\/api\/v1\/products(.*)/;
    const categoriesUrlRegExp: RegExp = /\/api\/v1\/categories(.*)/;
    // const allowAll: RegExp = /(.*)/;
    const excludeApis: ExcludeApi[] = [
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
        `${api}/login`,
        `${api}/signup`
        // { url: allowAll } // Allow all the APIs
    ];

    return excludeApis;
}

function authJwt() {
    const secret: string = process.env.SECRET;
    const excludeApis: ExcludeApi[] = getApiList();
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
