import React from "react";
import { LineChart } from "@mui/x-charts";

const LineGraph = ({ name, data }) => {
  return (
    <div className="flex flex-col border-4 rounded-lg p-2 m-2">
      <div>{name}</div>
      <LineChart
        xAxis={[{ data: data["x"] }]}
        series={[
          {
            data: data["y"],
          },
        ]}
        width={300}
        height={200}
      />
    </div>
  );
};

export default LineGraph;
