import axios from 'axios';
import { constants } from '../shared/constants';

const UserService = {
    getUsers: () => {
        const token = sessionStorage.getItem('token');

        return axios({
            method: 'get',
            url: `${constants.apiURL}/users`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
};

export { UserService };
