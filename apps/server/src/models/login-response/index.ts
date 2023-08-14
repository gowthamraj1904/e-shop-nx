import { IApiResponse } from '@server/models';

interface ILoginApiResponse extends IApiResponse {
    user?: string;
    token?: string;
}

export { ILoginApiResponse };
