import React from "react";
import "./App.css";

import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import ContactsProvider from "./contexts/ContactsProvider";
import ConversationsProvider from "./contexts/ConversationsProvider";
function App() {
  const [id, setId] = useLocalStorage("id", null);
  return (
    <>
      {id ? (
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <DashBoard id={id} />
          </ConversationsProvider>
        </ContactsProvider>
      ) : (
        <Login onSubmitId={setId} />
      )}
    </>
  );
}

export default App;
