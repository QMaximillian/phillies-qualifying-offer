module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        phillies: {
          "maroon-retro": "#6F263D",
          "powder-blue-retro": "#6BACE4",
        },
      },
    },
  },
  variants: {
    extend: { backgroundColor: ["odd", "even"] },
  },
  plugins: [],
};
