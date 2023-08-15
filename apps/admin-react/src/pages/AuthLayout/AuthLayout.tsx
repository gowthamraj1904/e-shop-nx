import './AuthLayout.scss';
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface AuthLayoutProps {}

function AuthLayout(props: AuthLayoutProps): JSX.Element {
    return <Outlet />;
}

export default AuthLayout;
