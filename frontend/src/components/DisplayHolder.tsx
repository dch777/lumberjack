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
      <Button key={key} onPress={(e) => handleSwitchService(e)}>
        {key}
      </Button>
    );
  });

  return (
    <>
      <div className="flex flex-row w-full">
        <div className="flex flex-col">{serviceKeys}</div>
        <div>
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
