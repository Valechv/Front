/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdfa",
          100: "#cbfcf2",
          200: "#97f8e8",
          300: "#5cecda",
          400: "#2ad7c6",
          500: "#11baac",
          600: "#0b968e",
          700: "#0d7873",
          800: "#105f5c",
          900: "#124f4d",
          950: "#033030",
          DEFAULT: "#11baac",
        },
        secondary: {
          50: "#eaf3fb",
          100: "#cdd8e5",
          200: "#adbed1",
          300: "#8ca4be",
          400: "#6d8aac",
          500: "#537092",
          600: "#415773",
          700: "#2d3e52",
          800: "#1a2532",
          900: "#060c15",
          DEFAULT: "#455D7A",
        },
        "dark-gray": {
          DEFAULT: "#223142",
        },
      },
    },
  },
  plugins: [],
};
