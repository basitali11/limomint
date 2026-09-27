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
          DEFAULT: "#0a0a0b",   // primary background
          soft: "#141416",      // alternating section background
          card: "#1b1b1e",      // card surface
          line: "#2a2a2e",      // hairline borders
        },
        gold: {
          DEFAULT: "#f2b705",
          dim: "#c99206",
          bright: "#ffd23f",
        },
        paper: {
          DEFAULT: "#f5f4f1",
          dim: "#c9c9cd",
          muted: "#8d8d93",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "Helvetica", "Arial", "sans-serif"],
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
        "drift": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 1s ease forwards",
        "grow-x": "grow-x 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "drift-slow": "drift 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
