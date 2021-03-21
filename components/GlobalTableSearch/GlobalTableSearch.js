import React, { useState } from "react";

function GlobalTableSearch({ filter, setFilter }) {
  const [value, setValue] = useState(filter);

  return (
    <div className="sm:text-2xl flex bg-phillies-maroon-retro min-w-full justify-center items-center rounded-lg p-4">
      <span className="text-white mr-2">Search: </span>
      <input
        className="text-center rounded-lg"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setFilter(value);
        }}
      />
    </div>
  );
}

export { GlobalTableSearch };
