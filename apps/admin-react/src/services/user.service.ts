import axios, { AxiosResponse } from 'axios';
import { IUserApiResponse } from '@server/models';
import { CONSTANTS } from '../shared/constants';

async function getUsers(): Promise<IUserApiResponse> {
    const token: string | null = sessionStorage.getItem('token');

    const response: AxiosResponse = await axios({
        method: 'get',
        baseURL: `${CONSTANTS.apiURL}`,
        url: `/users`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

async function getUserById(
    userId: string | undefined
): Promise<IUserApiResponse> {
    const token: string | null = sessionStorage.getItem('token');

    const response: AxiosResponse = await axios({
        method: 'get',
        baseURL: `${CONSTANTS.apiURL}`,
        url: `/users/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export { getUsers, getUserById };
