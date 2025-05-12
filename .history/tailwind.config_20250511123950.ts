import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        background: "rgb(17, 24, 39)",
        foreground: "rgb(255, 255, 255)",
        primary: "rgb(59, 130, 246)",
        secondary: "rgb(156, 163, 175)",
        accent: "rgb(139, 92, 246)",
        muted: "rgb(75, 85, 99)",
        card: "rgb(31, 41, 55)",
        border: "rgb(75, 85, 99)",
        input: "rgb(55, 65, 81)",
        ring: "rgb(59, 130, 246)",
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
