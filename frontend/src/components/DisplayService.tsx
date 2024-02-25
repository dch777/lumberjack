import React, { useEffect, useRef, useState } from "react";
import LineGraph from "./LineGraph.tsx";
import LogDisplay from "./LogDisplay.tsx";
import { socket } from "../socket.js";

const DisplayService = ({ service }) => {
  const [previousService, setPreviousService] = useState("");
  const [memoryStats, setMemoryStats] = useState([]);
  const [cpuStats, setCPUStats] = useState([]);
  const memoryBuffer = useRef([]);
  const cpuBuffer = useRef([]);

  const indicator = service?.status === "running" ? "🟢" : "🔴";
  const display_name = service.name ? service.name : "No service selected";

  useEffect(() => {
    socket.on("stats", (response) => {
      console.log(response);
      memoryBuffer.current.push(response.memory_stats.usage * 1e-9);
      memoryBuffer.current = memoryBuffer.current.slice(-20);

      cpuBuffer.current.push(
        100 * 100 *
          (response.cpu_stats.cpu_usage.total_usage /
            response.cpu_stats.system_cpu_usage),
      );
      cpuBuffer.current = cpuBuffer.current.slice(-20);
    });

    return () => {
      socket.removeListener("stats");
    };
  }, []);

  useEffect(() => {
    memoryBuffer.current = [];
    cpuBuffer.current = [];
    setMemoryStats(memoryBuffer.current);
    setCPUStats(memoryBuffer.current);

    socket.emit("leave", previousService);
    socket.emit("join", service.id);
    socket.emit("request_info", service.id);

    setPreviousService(service.id);

    const interval = setInterval(() => {
      setCPUStats([...cpuBuffer.current]);
      setMemoryStats([...memoryBuffer.current]);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [service, previousService]);

  return (
    <div className="flex flex-col w-full">
      <div className="text-2xl m-2 text-darkgreen">
        {indicator} {display_name}
      </div>
      <div className="flex sm:flex-row justify-center m-2 rounded-lg border-huntergreen bg-huntergreen text-white w-full px-4 py-2">
        <LineGraph name="Service RAM Usage (GB)" y={memoryStats} />
        <LineGraph name="Service CPU Usage %" y={cpuStats} />
      </div>
      <LogDisplay service={service} />
    </div>
  );
};

export default DisplayService;
