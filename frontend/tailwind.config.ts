import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#f5f2ea",   // limestone canvas
          soft: "#ece8de",      // warm section contrast
          card: "#fffdf8",      // paper surface
          line: "#d8d1c4",      // warm hairline borders
        },
        gold: {
          DEFAULT: "#88652f",   // restrained brass accent
          dim: "#745526",
          bright: "#9b773d",
        },
        paper: {
          DEFAULT: "#202923",   // evergreen charcoal
          dim: "#566159",
          muted: "#727b73",
        },
        forest: {
          DEFAULT: "#172321",
          deep: "#0d1514",
          light: "#2b3936",
        },
      },
      fontFamily: {
        display: ["Georgia", "'Times New Roman'", "serif"],
        body: ["'Avenir Next'", "Avenir", "'Segoe UI'", "Arial", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "grow-x": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        // "drift": {
        //   "0%": { transform: "translateX(0)" },
        //   "100%": { transform: "translateX(-50%)" },
        // },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 1s ease forwards",
        "grow-x": "grow-x 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        // "drift-slow": "drift 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
