import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import DisplayService from "./DisplayService.tsx";

const DisplayHolder = ({ data }) => {
  const dataKey = Object.keys(data);
  const [currentService, setCurrentService] = useState(dataKey[0]);

  const handleSwitchService = (event) => {
    setCurrentService(event.target.textContent);
  };

  let serviceKeys = dataKey.map((key) => {
    return (
      <Button className="m-1" key={key} onPress={(e) => handleSwitchService(e)}>
        {key}
      </Button>
    );
  });

  return (
    <>
      <div className="flex flex-row m-2 w-11/12 h-5/6 border-solid rounded-lg border-4">
        <div className="flex flex-col w-1/4 h-full p-2 border-r-4">
          {serviceKeys}
        </div>
        <div className="flex w-3/4 m-2">
          <DisplayService
            serviceName={data[currentService]["name"]}
            logs={data[currentService]["logs"]}
          />
        </div>
      </div>
    </>
  );
};

export default DisplayHolder;
