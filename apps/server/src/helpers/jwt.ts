import { Request } from 'express';
import { expressjwt as jwt } from 'express-jwt';

// TODO - Add token type
const isRevoked = async (req: Request, token): Promise<boolean> => {
    return !token.payload?.isAdmin;
};

export function authJwt() {
    const secret: string = process.env.SECRET;
    const api: string = process.env.API_URL;
    const productsImageUrlRegExp: RegExp = /\/public\/uploads(.*)/;
    const productsUrlRegExp: RegExp = /\/api\/v1\/products(.*)/;
    const categoriesUrlRegExp: RegExp = /\/api\/v1\/categories(.*)/;
    // const allowAll: RegExp = /(.*)/;
    const excludeApis: (string | { url: RegExp; methods: string[] })[] = [
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

    return jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        // Exclude these APIs from authorization
        path: excludeApis
    });
}
