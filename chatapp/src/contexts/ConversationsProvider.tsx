import React, { createContext, useState, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Contact } from "./ContactsProvider";

interface MessageType {
  text: string;
  sender: string;
}
interface Conversations {
  recipients: Contact[];
  messages: MessageType[];
  selected: boolean;
}

interface ConversatiosContextType {
  conversations: Conversations[];
  selectedConverstion: Conversations;
  createConversations: (recipients: Contact[], selected?: boolean) => void;
  setConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  conversationIndex: number;
  sendMessage: any;
}
interface Message {
  recipients: Contact[];
  text: string;
  sender: string;
}
const ConversationsContext = createContext({} as ConversatiosContextType);

export const useConversations = () => {
  return useContext(ConversationsContext);
};

type Props = {
  children?: any;
  id: string;
};

const ConversationsProvider: React.FC<Props> = ({ children, id }: Props) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [conversationIndex, setConversationIndex] = useState(0);
  const createConversations: (
    recipients: Contact[],
    selected?: boolean
  ) => void = (recipients, selected) => {
    if (selected == null) {
      selected = false;
    } else {
      selected = !selected;
    }
    setConversations((prevState: Conversations[]) => {
      const newData = prevState
        .filter((ele) => ele.recipients != recipients)
        .map((ele) => ({ ...ele, selected: false }));
      return [{ recipients, messages: [], selected: selected }, ...newData];
    });
  };
  const addMessageToConversation = ({ recipients, text, sender }: Message) => {
    setConversations((prevState: Conversations[]) => {
      let madeChanges = false;
      const newMessage = { sender, text };
      const newConversations = prevState.map((ele) => {
        if (arrayEquality(ele.recipients, recipients)) {
          madeChanges = true;
          return { ...ele, messages: [...ele.messages, newMessage] };
        }
        return ele;
      });
      console.log("new message", newMessage);
      console.log("new convo", newConversations);
      if (madeChanges) {
        console.log("message received in current convo");
        return newConversations;
      } else {
        console.log("new message in new convo");
        return [
          ...prevState,
          { recipients, messages: [newMessage], selected: false },
        ];
      }
    });
  };
  const sendMessage = (recipients: Contact[], text: string) => {
    addMessageToConversation({ recipients, text, sender: id });
  };
  const value = {
    conversations,
    selectedConverstion: conversations[conversationIndex],
    createConversations,
    setConversationIndex,
    conversationIndex,
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

const arrayEquality = (a: Contact[], b: Contact[]) => {
  if (a.length !== b.length) {
    return false;
  }
  a.sort();
  b.sort();
  return JSON.stringify(a) === JSON.stringify(b); 
  
};

export default ConversationsProvider;
