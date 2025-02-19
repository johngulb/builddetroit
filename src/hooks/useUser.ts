import React from 'react';
import { getUser, User } from "../dpop";

export const useUser = (): User | undefined => {
    const [ user, setUser ] = React.useState<User>();
    React.useEffect(() => {
        setUser(getUser());
    }, []);
    React.useEffect(() => {
        window.addEventListener("DPoP_AUTH", (event: CustomEvent) => {
            setUser(event.detail.user);
        });
    }, []);
    return user;
}
