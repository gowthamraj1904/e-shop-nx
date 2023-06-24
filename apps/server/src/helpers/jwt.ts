import { Request } from 'express';
import { expressjwt as jwt } from 'express-jwt';

const isRevoked = async (req: Request, token) => {
    return !token.payload.isAdmin ? true : false;
};

export function authJwt() {
    const secret = process.env.SECRET;
    const api = process.env.API_URL;
    const productsImageUrlRegExp = /\/public\/uploads(.*)/;
    const productsUrlRegExp = /\/api\/v1\/products(.*)/;
    const categoriesUrlRegExp = /\/api\/v1\/categories(.*)/;
    const allowAll = /(.*)/;
    const excludeApis = [
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
        `${api}/users/login`,
        `${api}/users/register`
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
