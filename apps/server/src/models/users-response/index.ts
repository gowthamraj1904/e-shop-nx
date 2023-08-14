import { IUser } from '@libs/shared/interfaces';
import { IApiResponse } from '@server/models';

interface IUserApiResponse extends IApiResponse {
    users?: IUser[];
    user?: IUser;
}

export { IUserApiResponse };
