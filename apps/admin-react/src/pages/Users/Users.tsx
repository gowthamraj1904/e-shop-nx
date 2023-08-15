import './Users.scss';
import { JSX } from 'react';

/* eslint-disable-next-line */
export interface UsersProps {}

export function Users(props: UsersProps): JSX.Element {
    return (
        <div>
            <h1>Welcome to Users!</h1>
        </div>
    );
}

export default Users;
