import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

export default () => {
  const username = useSelector((state) => state.user.username);
  return (
    <div>
      <Header headerText="Dashboard">
        <div>{username}</div>
      </Header>
    </div>
  );
};
