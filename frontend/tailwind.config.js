/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'font-light': '#fff',
      'font-gray': '#a2a2a2',
      'font-dark': '#000',
      'background-light': '#fff',
      'background-dark': '#000',
      'action': '#0095f6',
      'danger': '#ed4956',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',

    },
    extend: {},
  },
  plugins: [],
}