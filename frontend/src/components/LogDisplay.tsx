import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { socket } from "../socket.js";
import { Button } from "@nextui-org/react";

const LogDisplay = ({ service }) => {
  const [logs, setLogs] = useState("");
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [anomalousIndices, setAnomalousIndices] = useState([]);
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
    setAnomalousIndices([]);

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

  const explainLog = (log) => {
    axios.post(
      "http://localhost:5000/info/explain/",
      { log: log },
    )
      .then(
        (response) => {
          setExplanation(response.data);
          setModalOpen(true);
        },
      );
  };

  const findAnomalies = () => {
    setLoading(true);
    axios.get(
      "http://localhost:5000/service/" + service.name + "/find_anomalies",
    )
      .then(
        (response) => {
          setAnomalousIndices(response.data);
          setLoading(false);
        },
      );
  };

  return (
    <div className="w-full">
      {modalOpen &&
        (
          <div
            className="flex justify-center items-center bg-black fixed inset-0 bg-opacity-25"
            onClick={() => setModalOpen(false)}
          >
            <div className="whitespace-pre-line bg-darkgreen text-khaki w-1/2 rounded-2xl p-4 border-khaki border-4 border-opacity-25">
              {explanation}
            </div>
          </div>
        )}
      <div
        className={"rounded overflow-y-scroll m-2 p-2 h-96 w-full bg-darkgreen text-khaki " +
          (loading ? "animate-pulse" : "")}
      >
        <table className="w-full">
          {logs.split("\n").map((line, index) => (
            <tr
              className={anomalousIndices.includes(index)
                ? "bg-red"
                : "hover:bg-huntergreen"}
            >
              <td className="w-8">
                <code className="pr-4">{index}</code>
              </td>
              <td onClick={(e) => explainLog(e.target.textContent)}>
                <code>{line}</code>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <Button
        className="bg-blue text-khaki m-2 content-center"
        onPress={() => findAnomalies()}
      >
        Find anomalies
      </Button>
    </div>
  );
};

export default LogDisplay;
