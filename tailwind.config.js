/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss}"
  ],
  theme: {
    extend: {
      colors: {
        boonifu: {
          gold: "#FFB800",
          yellow: "#F5B400",
          accent: "#169C7C",
          orange: "#E69500",
          light: "#FFF8E1",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        quicksand: ["var(--font-quicksand)", "sans-serif"],
      },
    },
  },
  plugins: [],
}