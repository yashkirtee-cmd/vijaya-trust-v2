/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
  ],
  theme: {
    extend: {
      colors: {
        orange:         "#F4631E",
        "orange-light": "#FF8C42",
        green:          "#1B8A6B",
        "green-light":  "#25B48A",
        dark:           "#1C1C2E",
        mid:            "#4A4A6A",
        muted:          "#7A7A9A",
        warm:           "#FFF6EE",
      },
      fontFamily: {
        head: ["Poppins", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
      borderRadius: { card: "14px" },
      boxShadow:    { card: "0 4px 24px rgba(0,0,0,0.08)" },
    },
  },
  plugins: [],
};
