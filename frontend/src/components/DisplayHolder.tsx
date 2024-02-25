import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import DisplayService from "./DisplayService.tsx";
import { ReactComponent as Logo } from "../logo.svg";

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
        className={"m-1 text-khaki " +
          (data[key].status === "running" ? "bg-huntergreen" : "bg-red")}
        key={key}
        onPress={(e) => setCurrentServiceID(e.target.textContent)}
      >
        {data[key].name}
      </Button>
    );
  });

  return (
    <div className="flex flex-row w-full h-full border-solid rounded-lg border-4 border-huntergreen">
      <div className="flex flex-col items-center justify-center">
        <Logo width={256} height={256} />
        <div className="text-4xl font-bold mx-2 mb-2 text-darkgreen text-center">
          Lumberjack
        </div>
        <span class="px-3 text-gray-500 bg-huntergreen" />
        <div className="border-t border-huntergreen pt-4 border-thick text-2xl mx-2 text-darkgreen">
          Services
        </div>
        <div className="flex flex-col grow w-full h-full p-2">
          {serviceKeys}
        </div>
      </div>
      <div className="flex w-full p-2 border-huntergreen border-l-4 mr-4">
        <DisplayService
          service={currentService}
        />
      </div>
    </div>
  );
};

export default DisplayHolder;
