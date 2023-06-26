import { createBrowserRouter } from 'react-router-dom';
import { Router } from '@remix-run/router';
import App from '../app/App';
import { ErrorPage } from '@libs/shared/react/error-page';

export const router: Router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/dashboard',
                lazy: async () => {
                    return {
                        Component: (
                            await import('../pages/Dashboard/Dashboard')
                        ).Dashboard
                    };
                }
            },
            {
                path: '/users',
                lazy: async () => {
                    return {
                        Component: (await import('../pages/Users/Users')).Users
                    };
                }
            }
        ]
    },
    {
        path: '/login',
        lazy: async () => {
            return {
                Component: (await import('../pages/Signup/Signup')).Signup
            };
        }
    },
    {
        path: '/signup',
        lazy: async () => {
            return {
                Component: (await import('../pages/Login/Login')).Login
            };
        }
    },
    {
        path: '*',
        Component: ErrorPage
    }
]);
