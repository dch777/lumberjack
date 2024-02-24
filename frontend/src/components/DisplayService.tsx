import React from "react";
import LineGraph from "./LineGraph.tsx";
const DisplayService = ({ serviceName, logs }) => {
  return (
    <div className="flex flex-col">
      <div>{serviceName}</div>
      <div>{logs}</div>
      <div>
        <LineGraph
          name="Anomolies"
          data={{ x: [0, 2, 3, 5, 8, 10], y: [2, 5, 2, 8, 1, 5] }}
        />
      </div>
      
    </div>
  );
};

export default DisplayService;
