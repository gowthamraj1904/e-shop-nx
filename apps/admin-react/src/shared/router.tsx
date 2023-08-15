import { createBrowserRouter } from 'react-router-dom';
import { Router } from '@remix-run/router';
import App from '../components/App';
import { Layout } from '../pages/Layout';
import { AuthLayout } from '../pages/AuthLayout';
import { PageNotFound } from '@libs/shared/react/pages';

export const router: Router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        errorElement: <PageNotFound />,
        children: [
            {
                index: true,
                Component: Layout
            },
            {
                Component: Layout,
                children: [
                    {
                        index: true,
                        path: '/dashboard',
                        lazy: async () => {
                            return {
                                Component: (await import('../pages/Dashboard'))
                                    .Dashboard
                            };
                        }
                    },
                    {
                        path: '/users',
                        lazy: async () => {
                            return {
                                Component: (await import('../pages/Users'))
                                    .Users
                            };
                        }
                    },
                    {
                        path: '/user/:id',
                        lazy: async () => {
                            return {
                                Component: (await import('../pages/User')).User
                            };
                        }
                    }
                ]
            },
            {
                Component: AuthLayout,
                children: [
                    {
                        path: '/signup',
                        lazy: async () => {
                            return {
                                Component: (await import('../pages/Signup'))
                                    .Signup
                            };
                        }
                    },
                    {
                        path: '/login',
                        lazy: async () => {
                            return {
                                Component: (await import('../pages/Login'))
                                    .Login
                            };
                        }
                    }
                ]
            },
            {
                path: '*',
                lazy: async () => {
                    return {
                        Component: (await import('@libs/shared/react/pages'))
                            .PageNotFound
                    };
                }
            }
        ]
    }
]);
