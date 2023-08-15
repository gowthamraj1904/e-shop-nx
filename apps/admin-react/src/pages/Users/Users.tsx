import { JSX, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IUser } from '@libs/shared/interfaces';
import { IUserApiResponse } from '@server/models';
import { UserService } from '@apps/admin/react/services';
import './Users.scss';

export function Users(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const [users, setUsers]: [IUser[], any] = useState<IUser[]>([]);

    useEffect((): void => {
        getUsers();
    }, []);

    async function getUsers(): Promise<void> {
        const response: IUserApiResponse = await UserService.getUsers();

        setUsers(response?.users);
    }

    return (
        <div className='grid grid-cols-5 gap-4'>
            {users?.map((user: IUser) => (
                <div className='shadow p-10' key={user.id}>
                    {user.name}{' '}
                    <button
                        onClick={() => {
                            navigate(`/user/${user.id}`);
                        }}
                    >
                        View
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Users;
