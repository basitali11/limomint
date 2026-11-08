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
          DEFAULT: "#151515",   // charcoal page background
          soft: "#2b2b2b",      // raised section surface
          card: "#202020",      // input and inset surface
          line: "#6b6b6b",      // visible borders against dark inputs and surfaces
        },
        gold: {
          DEFAULT: "#ff7355",   // readable orange-red accent
          dim: "#ef684d",
          bright: "#ff8066",
        },
        paper: {
          DEFAULT: "#ffffff",   // primary text
          dim: "#c2c2c2",       // secondary text
          muted: "#a3a3a3",     // muted labels and placeholders
        },
        forest: {
          DEFAULT: "#d93d20",   // primary action; white text contrast 4.5:1
          deep: "#111111",
          light: "#c7361c",
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
