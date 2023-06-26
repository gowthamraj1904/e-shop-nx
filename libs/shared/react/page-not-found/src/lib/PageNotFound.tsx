import './PageNotFound.scss';

/* eslint-disable-next-line */
export interface PageNotFoundProps {}

export function PageNotFound(props: PageNotFoundProps) {
    return (
        <div id='page-not-found-container'>
            <h1>Oops!</h1>
            <p>Page not found.</p>
        </div>
    );
}

export default PageNotFound;
