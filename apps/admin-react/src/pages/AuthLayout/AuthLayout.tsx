import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import './AuthLayout.scss';

function AuthLayout(): JSX.Element {
    return <Outlet />;
}

export default AuthLayout;
