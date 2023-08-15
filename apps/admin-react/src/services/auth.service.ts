import axios, { AxiosResponse } from 'axios';
import { ILoginApiResponse } from '@server/models';
import { ILogin } from '@libs/shared/interfaces';
import { CONSTANTS } from '../shared/constants';

async function login(loginInfo: ILogin): Promise<ILoginApiResponse> {
    const response: AxiosResponse = await axios({
        method: 'post',
        baseURL: `${CONSTANTS.apiURL}`,
        url: `/login`,
        data: loginInfo
    });

    return response.data;
}

export { login };
