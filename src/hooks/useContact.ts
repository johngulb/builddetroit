import React from "react";
import { getContact, Contact } from "../dpop";

export const useContact = (): Contact | undefined => {
  const [contact, setContact] = React.useState<Contact>();
  React.useEffect(() => {
    const c = getContact();
    setContact(c);
  }, []);
  return contact;
};

export const useEmail = (): string | undefined => {
  const contact = useContact();
  return contact?.email;
};
