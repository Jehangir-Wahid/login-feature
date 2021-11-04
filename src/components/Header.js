import React from "react";

export default ({ headerText, children }) => {
  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col col-md-12">
          <h2>{headerText}</h2>
          <h3 className="text-secondary">{children}</h3>
        </div>
      </div>
    </div>
  );
};
