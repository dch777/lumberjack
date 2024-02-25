import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { socket } from "../socket.js";

const LogDisplay = ({ service }) => {
  const [logs, setLogs] = useState("");
  const [loading, setLoading] = useState(true);
  const buffer = useRef("");

  useEffect(() => {
    socket.on("log_data", (response) => {
      buffer.current += response;
    });

    return () => {
      socket.removeListener("log_data");
    };
  }, []);

  useEffect(() => {
    if (service.id) {
      setLoading(true);
      axios.get("http://localhost:5000/service/" + service.id + "/logs").then(
        (response) => {
          setLogs(response.data);
          buffer.current = response.data;
          setLoading(false);
        },
      );
    }

    const interval = setInterval(() => {
      setLogs(buffer.current);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [service]);

  return (
    <div className="w-full">
      <div
        className={"rounded overflow-y-scroll m-2 p-2 h-96 w-full bg-darkgreen text-khaki " +
          (loading ? "animate-pulse" : "")}
      >
        <table className="w-full">
          {logs.split("\n").map((line, index) => (
            <tr className="hover:bg-huntergreen">
              <td className="w-8">
                <code className="pr-4">{index}</code>
              </td>
              <td>
                <code>{line}</code>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default LogDisplay;
