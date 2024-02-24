import React from "react";
import LineGraph from "./LineGraph.tsx";
import LogDisplay from "./LogDisplay.tsx";

const DisplayService = ({ serviceName, logs, data }) => {
  return (
    <div className="flex flex-col">
      <div>{serviceName}</div>
      <div className="flex w-full flex-wrap">
        <LineGraph name={data[0]["name"]} data={data[0]} />
        <LineGraph name={data[1]["name"]} data={data[1]} />
      </div>
      <LogDisplay logs={logs} />
    </div>
  );
};

export default DisplayService;
