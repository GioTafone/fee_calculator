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
      primaryGreen: "#07da63",
      primaryWhite: "#ffffff",
      primaryRed: "#A30000",
      primaryBlack: "#212121",
      blue: "#0000ff",
      primaryZinc: "#bac4c8"
    },
  },
  plugins: [],
}