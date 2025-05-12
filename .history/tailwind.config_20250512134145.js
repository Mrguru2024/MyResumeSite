/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: 'rgb(17, 24, 39)',
          black: 'rgb(0, 0, 0)',
        },
        text: {
          primary: 'rgb(255, 255, 255)',
          secondary: 'rgb(156, 163, 175)',
          accent: 'rgb(59, 130, 246)',
        },
        button: {
          primary: 'rgb(37, 99, 235)',
          primaryHover: 'rgb(29, 78, 216)',
          text: 'rgb(255, 255, 255)',
        },
        card: {
          bg: 'rgb(31, 41, 55)',
          border: 'rgb(75, 85, 99)',
          hover: 'rgb(55, 65, 81)',
        },
        skill: {
          fullstack: 'rgb(59, 130, 246)',
          field: 'rgb(16, 185, 129)',
          lowvoltage: 'rgb(245, 158, 11)',
          leadership: 'rgb(139, 92, 246)',
          repair: 'rgb(239, 68, 68)',
        },
        progress: {
          bar: 'rgb(59, 130, 246)',
          bg: 'rgb(31, 41, 55)',
        },
        link: {
          hover: 'rgb(96, 165, 250)',
        },
        shadow: {
          card: 'rgba(0, 0, 0, 0.1)',
          text: 'rgba(0, 0, 0, 0.5)',
          glow: 'rgba(59, 130, 246, 0.5)',
        },
      },
      screens: {
        zfold: { raw: '(max-width: 400px) and (max-height: 900px)' },
      },
    },
  },
  plugins: [],
};
