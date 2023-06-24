import { Route, Routes, Link } from 'react-router-dom';
import { Header } from '@libs/admin/react/header';
import './App.scss';

export function App() {
    return (
        <div>
            <Header />
            <div role='navigation'>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/page-2'>Page 2</Link>
                    </li>
                </ul>
                h
            </div>
            <Routes>
                <Route
                    path='/'
                    element={
                        <div>
                            This is the generated root route.{' '}
                            <Link to='/page-2'>Click here for page 2.</Link>
                        </div>
                    }
                />
                <Route
                    path='/page-2'
                    element={
                        <div>
                            <Link to='/'>
                                Click here to go back to root page.
                            </Link>
                        </div>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
