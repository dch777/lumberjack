import { React, useEffect, useState } from "react";
import DisplayHolder from "./DisplayHolder.tsx";
import axios from "axios";
import { socket } from "../socket.js";

const Root = () => {
  const [services, setServices] = useState({ containers: [] });

  useEffect(() => {
    socket.connect();
    axios.get("http://localhost:5000/info/containers").then(
      (response) => {
        setServices(response.data);
      },
    );
  }, []);

  return (
    <div className="flex w-full h-screen bg-khaki flex-col p-2 lg:px-64">
      <DisplayHolder data={services.containers} />
    </div>
  );
};

export default Root;
