/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        BodyFont: ["Quicksand", "sans-serif"]
      },
    },
    colors: {
      primaryGreen: "#75fa6a",
      primaryWhite: "#ffffff",
      primaryRed: "#A30000",
      primaryBlack: "#212121"
    },
  },
  plugins: [],
}