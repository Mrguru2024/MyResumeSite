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
        background: 'hsl(var(--background))',
        'text-primary': 'hsl(var(--foreground))',
        'text-secondary': 'hsl(var(--muted-foreground))',
        text: {
          accent: 'rgb(59, 130, 246)',
        },
        button: {
          primary: 'rgb(37, 99, 235)',
          primaryHover: 'rgb(29, 78, 216)',
          text: 'rgb(255, 255, 255)',
        },
        card: {
          bg: 'hsl(var(--card))',
          border: 'hsl(var(--border))',
          hover: 'hsl(var(--card))',
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
