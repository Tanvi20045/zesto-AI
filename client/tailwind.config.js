/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#ff5722",
          light:   "#ff7043",
          dark:    "#e64a19",
        },
      },
    },
  },
  plugins: [],
};
