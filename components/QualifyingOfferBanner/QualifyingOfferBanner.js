import React from "react";
import PropTypes from "prop-types";

function formatQualifyingOffer(offer) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(offer);
}

function QualifyingOfferBanner({ qualifyingOffer }) {
  return (
    <div className="rounded-lg bg-phillies-maroon-retro h-full w-full flex justify-center items-center text-white font-extrabold text-4xl md:text-6xl">
      <h1 className="text-center h-full w-full flex justify-center items-center">
        {formatQualifyingOffer(qualifyingOffer)}
      </h1>
    </div>
  );
}

QualifyingOfferBanner.PropTypes = {
  qualifyingOffer: PropTypes.number.isRequired,
};

export { QualifyingOfferBanner };
