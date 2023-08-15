import { JSX, useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';
import { IUser } from '@libs/shared/interfaces';
import { IUserApiResponse } from '@server/models';
import { UserService } from '@apps/admin/react/services';
import './User.scss';

function User(): JSX.Element {
    const { id }: Params<string> = useParams<string>();
    const [user, setUser]: [any, any] = useState<IUser>();

    useEffect((): void => {
        if (id) {
            getUser();
        }
    }, []);

    async function getUser(): Promise<void> {
        const response: IUserApiResponse = await UserService.getUserById(id);

        setUser(response?.user);
    }

    return <div>{user?.name}</div>;
}

export default User;
