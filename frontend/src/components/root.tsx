import React from "react";
import DisplayHolder from "./DisplayHolder.tsx";
import { services } from "./data/TestConstants.tsx";

const Root = () => {
  return (
    <div className="flex w-full h-full bg-khaki flex-col p-2">
      <div className="text-4xl m-2 text-darkgreen">Lumberjack</div>
      <DisplayHolder data={services} />
    </div>
  );
};

export default Root;
