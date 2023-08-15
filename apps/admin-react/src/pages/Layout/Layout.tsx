import './Layout.scss';
import { JSX } from 'react';
import { Header } from '@libs/admin/react/components';
import { Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LayoutProps {}

function Layout(props: LayoutProps): JSX.Element {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Layout;
