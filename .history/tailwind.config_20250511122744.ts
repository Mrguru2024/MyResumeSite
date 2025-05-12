import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        background: {
          dark: "rgb(17, 24, 39)",
          black: "rgb(0, 0, 0)",
        },
        text: {
          primary: "rgb(255, 255, 255)",
          secondary: "rgb(156, 163, 175)",
          accent: "rgb(59, 130, 246)",
        },
        skill: {
          dev: "rgb(59, 130, 246)", // Blue-500
          tech: "rgb(16, 185, 129)", // Emerald-500
          voltage: "rgb(245, 158, 11)", // Amber-500
          leadership: "rgb(139, 92, 246)", // Purple-500
          repair: "rgb(239, 68, 68)", // Red-500
        },
        card: {
          bg: "rgb(31, 41, 55)", // Gray-800
          border: "rgb(75, 85, 99)", // Gray-600
          hover: "rgb(55, 65, 81)", // Gray-700
        },
        button: {
          primary: "rgb(37, 99, 235)", // Blue-600
          hover: "rgb(29, 78, 216)", // Blue-700
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
