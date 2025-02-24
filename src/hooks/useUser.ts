import React from 'react';
import { Contact, getContact, getUser, User } from "../dpop";

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

export const useContact = (): Contact | undefined => {
    const [ contact, setContact ] = React.useState<Contact>();
    React.useEffect(() => {
        setContact(getContact());
    }, []);
    React.useEffect(() => {
        window.addEventListener("DPoP_CONTACT", (event: CustomEvent) => {
            setContact(event.detail.contact);
        });
    }, []);
    return contact;
}