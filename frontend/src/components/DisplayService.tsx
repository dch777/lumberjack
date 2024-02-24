import React, { useEffect, useRef, useState } from "react";
import LineGraph from "./LineGraph.tsx";
import LogDisplay from "./LogDisplay.tsx";
import { socket } from "../socket.js";

const DisplayService = ({ service }) => {
  const indicator = service?.status === "running" ? "🟢" : "🔴";
  const display_name = service.name ? service.name : "No service selected";
  const [previousService, setPreviousService] = useState("");
  const [stats, setStats] = useState([]);

  useEffect(() => {
    socket.on("stats", (response) => {
      console.log(response);
    });

    return () => {
      socket.removeListener("stats");
    };
  }, []);

  useEffect(() => {
    socket.emit("leave", previousService);
    socket.emit("join", service.id);
    socket.emit("request_info", service.id);

    setPreviousService(service.id);
  }, [service]);

  return (
    <div className="flex flex-col w-full">
      <div className="text-2xl m-2 text-darkgreen">
        {indicator} {display_name}
      </div>
      <LogDisplay service={service} />
    </div>
  );
};

export default DisplayService;
