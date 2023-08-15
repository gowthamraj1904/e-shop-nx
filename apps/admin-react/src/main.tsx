import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './shared/router';

const rootElement: HTMLElement = document.getElementById('root') as HTMLElement;
const root: ReactDOM.Root = ReactDOM.createRoot(rootElement);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
