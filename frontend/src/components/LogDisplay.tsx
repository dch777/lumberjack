import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { socket } from "../socket.js";
import { Button, ButtonGroup } from "@nextui-org/react";

const LogDisplay = ({ service }) => {
  const [logs, setLogs] = useState("");
  const [loading, setLoading] = useState(true);
  const [explanation, setExplanation] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [anomalousIndices, setAnomalousIndices] = useState([]);
  const [index, setIndex] = useState(0);
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
    setIndex(0);

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

  useEffect(() => {
    if (anomalousIndices.length > 0) {
      const row = document.getElementById(anomalousIndices[index]);
      document.getElementById("scrolling_div").scrollTop = row.offsetTop;
    }
  }, [index]);

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
            className="flex justify-center items-center bg-black fixed inset-0 bg-opacity-25 z-50"
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
        id="scrolling_div"
      >
        <table className="w-full">
          {logs.split("\n").map((line, index) => (
            <tr
              className={anomalousIndices.includes(index)
                ? "bg-red hover:bg-darkred"
                : "hover:bg-huntergreen"}
              id={index}
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
      <div className="flex flex-row m-2">
        <Button
          className="bg-blue text-khaki mr-2"
          onPress={() => findAnomalies()}
        >
          Find anomalies
        </Button>
        {anomalousIndices.length > 0 && (
          <ButtonGroup>
            <Button
              className="font-bold"
              isDisabled={index === 0}
              onPress={() => {
                setIndex(index - 1);
              }}
            >
              {"<"}
            </Button>
            <Button
              className="font-bold"
              isDisabled={index === anomalousIndices.length - 1}
              onPress={() => {
                setIndex(index + 1);
              }}
            >
              {">"}
            </Button>
          </ButtonGroup>
        )}
      </div>
    </div>
  );
};

export default LogDisplay;
