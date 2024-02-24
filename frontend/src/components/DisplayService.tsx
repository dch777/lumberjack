import React from "react";

const DisplayService = ({ serviceName, logs }) => {
  return (
    <div className="flex flex-col">
      <div>{serviceName}</div>
      <div>{logs}</div>
    </div>
  );
};

export default DisplayService;
