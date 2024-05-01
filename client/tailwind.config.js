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
        skin: {
          white: withOpacity("--color-white"),
          black: withOpacity("--color-black"),
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
          fadedOrange: withOpacity("--color-faded-orange"),

          green: withOpacity("--color-green"),
          orange: withOpacity("--color-orange"),
          gray: withOpacity("--color-gray"),
        },
      },
      backgroundColor: {
        skin: {
          whisper: withOpacity("--color-whisper"),

          green: withOpacity("--color-green"),
          orange: withOpacity("--color-orange"),
          gray: withOpacity("--color-gray"),
        },
      },
      fontFamily: {
        spartan: ["Spartan", "sans-serif"],
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
