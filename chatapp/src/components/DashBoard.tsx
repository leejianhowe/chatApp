import React from "react";
import SideBar from "./SideBar";
type Props = {
  id: string;
};
const DashBoard = ({ id }: Props) => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideBar id={id} />
    </div>
  );
};

export default DashBoard;
