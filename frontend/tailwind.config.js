/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'peru-red': '#C41E3A',
        'peru-yellow': '#F4D03F',
        'peru-green': '#27AE60',
        'peru-brown': '#8B4513'
      },
      fontFamily: {
        'peruvian': ['Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}