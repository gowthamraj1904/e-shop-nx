import './Header.scss';
import { Link } from 'react-router-dom';
import { JSX } from 'react';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps): JSX.Element {
    return (
        <header>
            <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800'>
                <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
                    <Link to='/' className='flex items-center'>
                        <img
                            src='https://flowbite.com/docs/images/logo.svg'
                            className='mr-3 h-6 sm:h-9'
                            alt='eShop Logo'
                        />
                        <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                            eShop
                        </span>
                    </Link>
                    <div className='flex items-center lg:order-2'>
                        <Link
                            to='/login'
                            className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
                        >
                            Log in
                        </Link>
                        <Link
                            to='/signup'
                            className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
                        >
                            Sign up
                        </Link>
                        <Link
                            to='/login'
                            className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
                        >
                            Log out
                        </Link>
                    </div>
                    <div
                        className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1'
                        id='mobile-menu-2'
                    >
                        <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
                            <li>
                                <Link
                                    to='/dashboard'
                                    className='block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white'
                                    aria-current='page'
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/users'
                                    className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                                    aria-current='page'
                                >
                                    Users
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/categories'
                                    className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                                    aria-current='page'
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/products'
                                    className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                                    aria-current='page'
                                >
                                    Products
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
