import { Outlet } from 'react-router-dom';
import { Header } from '@libs/admin/react/components';
import './App.scss';

export function App() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}

export default App;
