import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import './PageNotFound.scss';

export function PageNotFound() {
    const error: any = useRouteError();
    let errorMessage = '';

    if (isRouteErrorResponse(error)) {
        errorMessage = error.error?.message || error.statusText;
    }

    return (
        <div id='page-not-found-container'>
            <h1>Oops!</h1>
            <p>Page not found.</p>
            {errorMessage ? (
                <p>
                    <i>{errorMessage}</i>
                </p>
            ) : null}
        </div>
    );
}

export default PageNotFound;
