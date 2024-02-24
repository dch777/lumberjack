import React from "react";
import DisplayHolder from "./DisplayHolder.tsx";
import { services } from "./data/TestConstants.tsx";

const Root = () => {
  return (
    <>
      <div>Lumberjack</div>
      <DisplayHolder data={services} />
    </>
  );
};

export default Root;
