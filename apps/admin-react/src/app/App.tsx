import { Link, Outlet } from 'react-router-dom';
import { Header } from '@libs/admin/react/components';
import './App.scss';

export function App() {
    return (
        <div>
            <Header />
            <div role='navigation'>
                <ul>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li>
                        <Link to='/signup'>Signup</Link>
                    </li>
                    <li>
                        <Link to='/dashboard'>Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/users'>Users</Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </div>
    );
}

export default App;
