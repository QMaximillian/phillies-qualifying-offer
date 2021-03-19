import React from "react";
import PropTypes from "prop-types";
import { formatInUSCurrency } from "../../utils/index.js";

function QualifyingOfferBanner({ qualifyingOffer }) {
  return (
    <div className="px-4 shadow-lg rounded-lg bg-phillies-maroon-retro h-full w-full flex justify-center items-center text-white font-extrabold text-4xl md:text-6xl">
      <h1 className="text-center h-full w-full flex justify-center items-center">
        {formatInUSCurrency(qualifyingOffer)}
      </h1>
    </div>
  );
}

QualifyingOfferBanner.PropTypes = {
  qualifyingOffer: PropTypes.number.isRequired,
};

export { QualifyingOfferBanner };
