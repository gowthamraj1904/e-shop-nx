import { LoginForm } from '@libs/admin/react/components';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '@libs/shared/interfaces';
import './Login.scss';

export function Login() {
    function onLogin(loginInfo: ILogin) {
        AuthService.login(loginInfo).then(
            (res) => {
                console.log(res);
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
