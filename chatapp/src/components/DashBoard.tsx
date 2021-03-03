import React from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import OpenConversation from "./OpenConversation";
import SideBar from "./SideBar";
type Props = {
  id: string;
};
const DashBoard = ({ id }: Props) => {
  const {selectedConverstion} = useConversations()
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideBar id={id} />
      {selectedConverstion && <OpenConversation/>}
    </div>
  );
};

export default DashBoard;
