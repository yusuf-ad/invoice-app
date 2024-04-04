function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        black: withOpacity("--color-black"),
        white: withOpacity("--color-white"),

        purple: withOpacity("--color-purple"),
        heliotrope: withOpacity("--color-heliotrope"),
        mirage: withOpacity("--color-mirage"),
        ebony: withOpacity("--color-ebony"),
        selago: withOpacity("--color-selago"),
        baliHai: withOpacity("--color-bali-hai"),
        shipCove: withOpacity("--color-ship-cove"),
        vulcan: withOpacity("--color-vulcan"),
        burntSienna: withOpacity("--color-burnt-sienna"),
        monaLisa: withOpacity("--color-mona-lisa"),
        whisper: withOpacity("--color-whisper"),
        offWhite: withOpacity("--color-off-white"),
        mirage2: withOpacity("--color-mirage2"),
        darkAccent: withOpacity("--color-dark-accent"),
        orange: withOpacity("--color-orange"),
        fadedOrange: withOpacity("--color-faded-orange"),
        otherDark: withOpacity("--color-other-dark"),
      },
      fontFamily: {
        spartan: ["Spartan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
