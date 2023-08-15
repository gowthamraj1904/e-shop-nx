import { Outlet } from 'react-router-dom';
import { JSX } from 'react';
import './App.scss';

export function App(): JSX.Element {
    return <Outlet />;
}

export default App;
