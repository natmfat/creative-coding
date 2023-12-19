/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./sketches/**/*.{js,ts,jsx,tsx,html}",
    "./shared/**/*.{js,ts,jsx,tsx,html,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
