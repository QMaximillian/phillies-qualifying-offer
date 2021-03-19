import React from "react";
import { PropTypes } from "prop-types";

function MainLayout({ children }) {
  return (
    <main className="relative h-full w-full flex flex-col justify-start border-2 border-black bg-phillies-powder-blue-retro text-black p-2">
      {children}
    </main>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MainLayout };
