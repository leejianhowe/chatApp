import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
type Props = {
  closeModal: () => void;
};
function NewConversationModal({ closeModal }: Props) {

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
    </>
  );
}

export default NewConversationModal;
