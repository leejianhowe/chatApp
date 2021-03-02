import React from "react";
import "./App.css";

import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import ContactsProvider from "./contexts/ContactsProvider";
function App() {
  const [id, setId] = useLocalStorage("id", null);
  return (
    <>
      {id ? (
        <ContactsProvider>
          <DashBoard id={id} />
        </ContactsProvider>
      ) : (
        <Login onSubmitId={setId} />
      )}
    </>
  );
}

export default App;
