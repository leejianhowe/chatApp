import React, { useState, useEffect } from "react";

const startWSConn = (name: string) => {
  const url = `ws://localhost:3000/chat?name=${name}`;
  const ws = new WebSocket(url);
  ws.onopen = () => {
    console.log("connected");
  };
  ws.onclose = () => {
    console.log("closed");
  };
  ws.onmessage = (event) => {
    console.log("message", event.data);
  };
  return ws;
};

const Chat = () => {
  const [name, setName] = useState("");
  const [buttonName, setButtonName] = useState("Connect");
  const [ws, setWs] = useState(null) as any;
  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    setName(event.target.value);
  };
  const handleSubmit: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = () => {
    console.log(name);
    if (buttonName === "Disconnect") {
      setButtonName("Join");
      ws.close();
    } else {
      setButtonName("Disconnect");
      setWs(startWSConn(name));
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <h1>Chat</h1>
      </div>
      <input type="text" value={name} name="name" onChange={handleChange} />
      <button type="button" onClick={handleSubmit}>
        {buttonName}
      </button>
    </>
  );
};

export default Chat;
