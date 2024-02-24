import React from "react";

const LogDisplay = ({ logs }) => {
  const log = logs.map((log) => {
    return <div>{log}</div>;
  });

  return <>{log}</>;
};

export default LogDisplay;
