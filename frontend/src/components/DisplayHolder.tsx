import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import DisplayService from "./DisplayService.tsx";

const DisplayHolder = ({ data }) => {
  const dataKey = Object.keys(data);
  const [currentServiceID, setCurrentServiceID] = useState(dataKey[0]);
  const [currentService, setCurrentService] = useState({
    labels: {},
    name: "",
    status: "",
  });

  useEffect(() => {
    if (currentServiceID) {
      axios.get("http://localhost:5000/service/" + currentServiceID).then(
        (response) => {
          setCurrentService(response.data["service"]);
        },
      );
    }
  }, [currentServiceID]);

  const serviceKeys = dataKey.map((key) => {
    return (
      <Button
        className="m-1 bg-huntergreen text-khaki"
        key={key}
        onPress={(e) => setCurrentServiceID(e.target.textContent)}
      >
        {data[key]}
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
            service={currentService}
          />
        </div>
      </div>
    </>
  );
};

export default DisplayHolder;
