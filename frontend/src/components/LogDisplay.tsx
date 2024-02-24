import React from "react";

const LogDisplay = ({ logs }) => {
  let log = logs.map((log) => {
    return <div>{log}</div>;
  });

  return <>{log}</>;
};

export default LogDisplay;
