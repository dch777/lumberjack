import React from "react";
import { useTable } from "react-table";

const LogDisplay = ({ logs }) => {
  console.log(logs);
  const data = React.useMemo(() => logs, [logs]);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Error Type",
        accessor: "error_type",
      },
      {
        Header: "Timestamp",
        accessor: "timestamp",
      },
      {
        Header: "Read More",
        accessor: "buh",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <div className="flex flex-col m-2 text-left">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) =>
                    cell.column.Header !== "Read More" ? (
                      <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
                    ) : (
                      <td>
                        <button> More Information</button>
                      </td>
                    )
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogDisplay;
