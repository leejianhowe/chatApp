import React, { createContext, ReactNode, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface Contact {
  id: string;
  name: string;
}

interface ContactsContextsType{
  contacts: Contact[];
  createContact: (id: string, name: string) => void;
}

const ContactsContexts = createContext(
  {} as ContactsContextsType
);

export const useContacts = () => {
  return useContext(ContactsContexts);
};

type Props = {
  children?: any;
};

const ContactsProvider: React.FC<Props> = ({ children }: Props) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact: (id: string, name: string) => void = (id, name) => {
    setContacts((prevState: any) => {
      return [...prevState, { id, name }];
    });
  };

  return (
    <ContactsContexts.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContexts.Provider>
  );
};

export default ContactsProvider;
