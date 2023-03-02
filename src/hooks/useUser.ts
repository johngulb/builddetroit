import React from 'react';
import { getUser, User } from "../dpop";

export const useUser = (): User | undefined => {
    const [ user, setUser ] = React.useState<User>();
    React.useEffect(() => {
        setUser(getUser());
    }, []);
    return user;
}
