import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@libs/admin/react/components';
import './Layout.scss';

function Layout(): JSX.Element {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Layout;
