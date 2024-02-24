import React from "react";
import DisplayHolder from "./DisplayHolder.tsx";
import { services } from "./data/TestConstants.tsx";

const Root = () => {
  return (
    <>
      <div className="w-full text-4xl m-2">Lumberjack</div>
      <DisplayHolder data={services} />
    </>
  );
};

export default Root;
