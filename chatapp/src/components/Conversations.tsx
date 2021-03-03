import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import { Contact } from "../contexts/ContactsProvider";
const Conversations = () => {
  const { conversations, setConversationIndex, createConversations} = useConversations();
  const handleClick = (index:number,recipients:Contact[],selected:boolean)=>{
    setConversationIndex(index)
    createConversations(recipients,selected)
  }
  return (
    <ListGroup variant="flush">
      {conversations.map((ele, index) => {
        return (
          <ListGroup.Item
            key={index}
            action
            onClick={() => handleClick(index,ele.recipients,ele.selected) }
            active={ele.selected}
          >
            {ele.recipients.map((ele) => ele.name).join(", ")}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Conversations;
