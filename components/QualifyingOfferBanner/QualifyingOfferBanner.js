import React from "react";
import { formatInUSCurrency } from "../../utils/index.js";

function QualifyingOfferBanner({ qualifyingOffer }) {
  return (
    <div className="px-4 mt-2 md:mt-0 shadow-lg rounded-lg bg-phillies-maroon-retro h-full w-full flex justify-center items-center text-white font-extrabold text-4xl md:text-6xl">
      <h1 className="text-center h-full w-full flex justify-center items-center">
        {formatInUSCurrency(qualifyingOffer)}
      </h1>
    </div>
  );
}

export { QualifyingOfferBanner };
