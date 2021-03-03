import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useContacts, Contact } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";
type Props = {
  closeModal: () => void;
};
function NewConversationModal({ closeModal }: Props) {
  const { contacts } = useContacts();
  const { createConversations } = useConversations();
  const [selectedContactIds, setSelectedContactIds] = useState([] as Contact[]);
  const handleChange: (id: string, name: string) => void = (id, name) => {
    setSelectedContactIds((prevState) => {
      console.log(id, name);
      console.log(prevState);
      if (prevState.find((ele) => ele.id == id)) {
        // console.log("filter");
        return prevState.filter((ele) => id !== ele.id);
      } else {
        // console.log("no filter");
        return [...prevState, { id, name }];
      }
    });
  };
  const handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void = (
    event
  ) => {
    event.preventDefault();
    if (selectedContactIds.length === 0) {
      return null;
    }
    createConversations(selectedContactIds);
    closeModal();
  };
  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((ele) => {
            return (
              <Form.Group controlId={ele.id} key={ele.id}>
                <Form.Check
                  type="checkbox"
                  // value={selectedContactIds.includes(ele.id) ? 1 : 0}
                  label={ele.name}
                  onChange={() => handleChange(ele.id, ele.name)}
                />
              </Form.Group>
            );
          })}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewConversationModal;
