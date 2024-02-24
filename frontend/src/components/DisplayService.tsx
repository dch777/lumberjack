import React from "react";
import LineGraph from "./LineGraph.tsx";
import LogDisplay from "./LogDisplay.tsx";

const DisplayService = ({ serviceName, logs, data }) => {
  const graphs = data.map((dataObj, index) => {
    return <LineGraph name={data[index]["name"]} data={data[index]} />;
  });

  return (
    <div className="flex flex-col">
      <div className="text-2xl m-2 text-darkgreen">{serviceName}</div>
      <div className="flex w-full flex-wrap">{graphs}</div>
      <LogDisplay logs={logs} />
    </div>
  );
};

export default DisplayService;
