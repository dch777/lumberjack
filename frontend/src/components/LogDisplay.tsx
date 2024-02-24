import React from "react";

const LogDisplay = ({ logs }) => {
  const log = logs.map((log) => {
    return <div>{log}</div>;
  });

  return <div className="flex flex-col m-2">{log}</div>;
};

export default LogDisplay;
