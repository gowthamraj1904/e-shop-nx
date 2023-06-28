import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './LoginForm.scss';
import { ILogin } from '@libs/shared/interfaces';

export interface LoginFormProps {
    onLogin: (loginInfo: ILogin) => void;
}

export function LoginForm(props: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ILogin>();

    const onSubmit = handleSubmit((data) => props.onLogin(data));

    return (
        <div className='w-full max-w-xs login-form-wrapper'>
            <form
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
                onSubmit={onSubmit}
            >
                <div className='mb-6 font-bold text-3xl'>Login</div>
                <div className='mb-4'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='email'
                    >
                        Email
                    </label>
                    <input
                        className={`'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ' ${
                            errors.email ? 'border-red-500 ' : null
                        }`}
                        id='email'
                        type='text'
                        data-focused='true'
                        placeholder='Email'
                        aria-invalid={errors.email ? true : false}
                        {...register('email', { required: true })}
                    />
                    {errors.email && (
                        <p className='text-red-500 text-xs italic'>
                            Please enter the email.
                        </p>
                    )}
                </div>
                <div className='mb-6'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='password'
                    >
                        Password
                    </label>
                    <input
                        className={`'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ' ${
                            errors.password ? 'border-red-500 ' : null
                        }`}
                        id='password'
                        type='password'
                        placeholder='******************'
                        aria-invalid={errors.password ? true : false}
                        {...register('password', { required: true })}
                    />
                    {errors.password && (
                        <p className='text-red-500 text-xs italic'>
                            Please enter the password.
                        </p>
                    )}
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'
                    >
                        Sign In
                    </button>
                    <Link
                        className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
                        to='#'
                    >
                        Forgot Password?
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
