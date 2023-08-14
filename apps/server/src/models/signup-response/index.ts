import { IUser } from '@libs/shared/interfaces';
import { IApiResponse } from '@server/models';

interface ISignupApiResponse extends IApiResponse {
    user?: IUser;
}

export { ISignupApiResponse };
