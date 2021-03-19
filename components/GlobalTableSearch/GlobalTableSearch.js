import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import PropTypes from "prop-types";

function GlobalTableSearch({ filter, setFilter }) {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value);
  }, 400);

  return (
    <div className="text-2xl  h-16 w-1/3 bg-phillies-maroon-retro flex justify-center items-center rounded-lg m-auto">
      <span className="text-white mr-2">Search: </span>
      <input
        className="text-center rounded-lg uppercase"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
      />
    </div>
  );
}

GlobalTableSearch.propTypes = {};

export { GlobalTableSearch };
