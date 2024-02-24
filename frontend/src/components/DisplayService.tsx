import React from "react";

const DisplayService = ({ serviceName, logs }) => {
  return (
    <>
      <div>{serviceName}</div>
      <div>{logs}</div>
    </>
  );
};

export default DisplayService;
