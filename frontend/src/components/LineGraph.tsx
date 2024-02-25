import React from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const LineGraph = ({ name, y }) => {
  return (
    <ResponsiveContainer width="50%" height={300}>
      <LineChart data={y}>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis tick={{ fill: "white" }} dataKey={(v) => v} />
        <XAxis>
          <Label
            style={{
              textAnchor: "middle",
              fontSize: "100%",
              fill: "white",
            }}
            value={name}
          />
        </XAxis>

        <Line type="" dataKey={(v) => v} stroke="#ffffff" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
