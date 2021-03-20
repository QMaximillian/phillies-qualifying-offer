import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

function GlobalTableSearch({ filter, setFilter }) {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value);
  }, 300);

  return (
    <div className="sm:text-2xl h-16 bg-phillies-maroon-retro min-w-full inline-flex justify-center items-center rounded-lg">
      <span className="text-white mr-2">Search: </span>
      <input
        className="text-center rounded-lg"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
      />
    </div>
  );
}

export { GlobalTableSearch };
