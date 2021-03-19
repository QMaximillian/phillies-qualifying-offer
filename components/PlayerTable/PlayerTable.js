import React from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFlexLayout,
} from "react-table";
import { GlobalTableSearch } from "../GlobalTableSearch/GlobalTableSearch";

function PlayerTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, useFlexLayout);

  const { globalFilter } = state;

  return (
    <>
      <GlobalTableSearch filter={globalFilter} setFilter={setGlobalFilter} />
      <table className="w-full h-full" {...getTableProps()}>
        <thead className="bg-phillies-powder-blue-retro">
          {headerGroups.map((headerGroup) => (
            <tr
              className="h-16 text-xl 2xl:text-3xl underline sticky top-0 bg-phillies-powder-blue-retro"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="w-1/4 flex justify-center items-center"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "⬆️" : "⬇️") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="odd:bg-white even:bg-gray-300 h-16 font-semibold text-xl 2xl:text-2xl"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="flex justify-center items-center"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
PlayerTable.propTypes = {};

export { PlayerTable };