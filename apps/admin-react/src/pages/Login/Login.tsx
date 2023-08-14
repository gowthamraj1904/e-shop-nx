import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@libs/admin/react/components';
import { AuthService } from '@apps/admin/react/services';
import { ILogin } from '@libs/shared/interfaces';
import { constants } from '../../shared/constants';
import './Login.scss';

export function Login() {
    const navigate = useNavigate();

    async function handleLogin(loginInfo: ILogin) {
        try {
            const loginResponse = await AuthService.login(loginInfo);

            if (loginResponse) {
                sessionStorage.setItem('token', loginResponse.data.token);
                navigate(constants.pages.dashboard);
            }
        } catch (error) {
            console.error({ error });
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <LoginForm onLogin={handleLogin} />
        </div>
    );
}

export default Login;
