import axios from 'axios';
import { ILogin } from '@libs/shared/interfaces';
import { constants } from '../shared/constants';

const AuthService = {
    login: (loginInfo: ILogin) => {
        return axios.post(`${constants.apiURL}/login`, loginInfo);
    }
};

export { AuthService };
