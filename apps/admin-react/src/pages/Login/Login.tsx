import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@libs/admin/react/components';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '@libs/shared/interfaces';
import { constants } from '../../shared/constants';
import './Login.scss';

export function Login() {
    const navigate = useNavigate();

    function onLogin(loginInfo: ILogin) {
        AuthService.login(loginInfo).then(
            (res) => {
                sessionStorage.setItem('token', res.data.token);
                navigate(constants.pages.dashboard);
            },
            (err) => {
                console.log('err', err);
            }
        );
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <LoginForm onLogin={onLogin} />
        </div>
    );
}

export default Login;
