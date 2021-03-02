import React from "react";
import { useContacts } from "../contexts/ContactsProvider";
import { ListGroup } from "react-bootstrap";
const Contacts = () => {
  const { contacts } = useContacts();
  return (
    <ListGroup variant="flush">
      {contacts.map((ele) => (
        <ListGroup.Item key={ele.id}>{ele.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Contacts;
