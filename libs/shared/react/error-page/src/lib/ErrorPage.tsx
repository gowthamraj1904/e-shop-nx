import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import './ErrorPage.scss';

/* eslint-disable-next-line */
export interface ErrorPageProps {}

export function ErrorPage(props: ErrorPageProps) {
    const error: any = useRouteError();
    let errorMessage = '';

    if (isRouteErrorResponse(error)) {
        errorMessage = error.error?.message || error.statusText;
    }

    return (
        <div>
            <div id='error-page-container'>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                {errorMessage ? (
                    <p>
                        <i>{errorMessage}</i>
                    </p>
                ) : null}
            </div>
        </div>
    );
}

export default ErrorPage;
