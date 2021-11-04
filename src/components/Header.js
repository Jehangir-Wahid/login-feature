import React from "react";

export default ({ headerText, children }) => {
  return (
    <div>
      <h2>{headerText}</h2>
      <h3>{children}</h3>
    </div>
  );
};
