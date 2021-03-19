import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import PropTypes from "prop-types";

function GlobalTableSearch({ filter, setFilter }) {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value);
  }, 300);

  return (
    <span className="h-full w-full">
      Search
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
      />
    </span>
  );
}

GlobalTableSearch.propTypes = {};

export { GlobalTableSearch };
