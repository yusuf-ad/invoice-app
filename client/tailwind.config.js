/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        purple: "#7c5dfa",
        heliotrope: "#9277ff",
        mirage: "#1e2139",
        ebony: "#252945",
        selago: "#dfe3fa",
        baliHai: "#888eb0",
        shipCove: "#7e88c3",
        vulcan: "#0c0e16",
        burntSienna: "#ec5757",
        monaLisa: "#ff9797",
        whisper: "#f8f8fb",
        offWhite: "#f9fafe",
        mirage2: "#141625",
        darkAccent: "#494e6e",
        orange: "#ff8f00",
        fadedOrange: "rgba(255, 143, 0, 0.0571)",
        otherDark: "#373b53",
      },
      fontFamily: {
        spartan: ["Spartan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
