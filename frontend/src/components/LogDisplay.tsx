import React, { useEffect, useRef, useState } from "react";
import { useTable } from "react-table";
import { socket } from "../socket.js";

const LogDisplay = ({ service }) => {
  const [logs, setLogs] = useState("");
  let buffer = useRef("");

  useEffect(() => {
    socket.on("log_data", (response) => {
      console.log(response);
      buffer.current += response;
    });

    return () => {
      socket.removeListener("log_data");
    };
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/service/" + service.id + "/logs").then(
      (response) => {
        setLogs(response.data);
        buffer.current = response.data;
      },
    );

    const interval = setInterval(() => {
      setLogs(buffer.current);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [service]);

  return (
    <div className="w-full">
      <div className="overflow-y-scroll m-2 p-2 h-96 w-full bg-darkgreen text-khaki">
        <table className="w-full">
          {logs.split("\n").map((line, index) => (
            <tr>
              <td>
                <code className="pr-4">{index}</code>
              </td>
              <td>
                <code className="">{line}</code>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default LogDisplay;
