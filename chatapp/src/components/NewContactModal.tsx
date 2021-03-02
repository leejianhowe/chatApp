import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

import ContactsProvider,{useContacts} from '../contexts/ContactsProvider'

type Props = {
  closeModal: () => void;
};
const NewContactModal = ({ closeModal }: Props) => {
  const [contact, setContact] = useState({ id: "", name: "" });
  const {createContact} = useContacts()
  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setContact((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void = (
    event
  ) => {
    event.preventDefault();
    createContact(contact.id,contact.name)
    closeModal();
  };
  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <input
              className="form-control"
              type="text"
              required
              name="id"
              value={contact.id}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <input
              className="form-control"
              type="text"
              required
              name="name"
              value={contact.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewContactModal;
