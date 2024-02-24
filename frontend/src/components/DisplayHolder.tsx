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
      <Button
        className="m-1 bg-huntergreen text-khaki"
        key={key}
        onPress={(e) => handleSwitchService(e)}
      >
        {key}
      </Button>
    );
  });

  return (
    <>
      <div className="flex flex-row w-full h-full border-solid rounded-lg border-4 border-huntergreen">
        <div className="text-2xl m-2 text-darkgreen">Services</div>
        <div className="flex flex-col w-1/6 h-full p-2">{serviceKeys}</div>
        <div className="flex w-3/4 p-2 border-huntergreen border-l-4">
          <DisplayService
            serviceName={data[currentService]["name"]}
            logs={data[currentService]["logs"]}
            data={data[currentService]["data"]}
          />
        </div>
      </div>
    </>
  );
};

export default DisplayHolder;
