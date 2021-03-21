import React from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFlexLayout,
} from "react-table";
import { GlobalTableSearch } from "../GlobalTableSearch/GlobalTableSearch";

function PlayerTable({ columns, data }) {
  // React Table: https://react-table.tanstack.com/
  // I used React Table to create a simple table design
  // that would allow for simple sortin and a global search filter
  // I also wanted to apply some simple styles to the table, and React Table
  // is headless, making it easy to apply your own styles
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
      <div
        id="table-container"
        className="h-full w-full overflow-scroll bg-phillies-powder-blue-retro rounded-b-lg"
      >
        <table className="w-full h-full" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className="h-16 text-base 2xl:text-3xl underline bg-phillies-powder-blue-retro"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className="flex justify-center items-center"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {/* Clicking a column header will sort that cycle through sorting said column by 
                      ASC, DESC, NONE. */}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "⬆️"
                          : "⬇️"
                        : ""}
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
                  className="odd:bg-white even:bg-gray-300 h-16 font-semibold md:text-xl 2xl:text-2xl"
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
      </div>
    </>
  );
}

export { PlayerTable };
