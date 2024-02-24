import React from "react";

const LogDisplay = ({ logs }) => {
  return (
    <>
      {logs.forEach((log) => {
        <div>log</div>;
      })}
    </>
  );
};

export default LogDisplay;
