import React from 'react';
import { isAuthorized } from "../dpop";

export const useIsAuthorized = () => {
    const [ authorized, setAuthorized ] = React.useState(false);
    React.useEffect(() => {
        setAuthorized(isAuthorized());
    }, []);
    return authorized;
}
