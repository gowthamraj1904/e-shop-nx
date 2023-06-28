import axios from 'axios';
import { ILogin } from '@libs/shared/interfaces';

const AuthService = {
    login: (loginInfo: ILogin) => {
        return axios.post(`http://localhost:3000/api/v1/login`, loginInfo);
    }
};

export { AuthService };
