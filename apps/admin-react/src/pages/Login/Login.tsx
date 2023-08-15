import { JSX } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { LoginForm } from '@libs/admin/react/components';
import { AuthService } from '@apps/admin/react/services';
import { ILogin } from '@libs/shared/interfaces';
import { ILoginApiResponse } from '@server/models';
import { CONSTANTS } from '../../shared/constants';
import './Login.scss';

export function Login(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();

    async function handleLogin(loginInfo: ILogin): Promise<void> {
        const loginResponse: ILoginApiResponse = await AuthService.login(
            loginInfo
        );

        if (loginResponse) {
            sessionStorage.setItem('token', loginResponse?.token as string);
            navigate(CONSTANTS.pages.dashboard);
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <LoginForm onLogin={handleLogin} />
        </div>
    );
}

export default Login;
