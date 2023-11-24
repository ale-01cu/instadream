/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'font-light': '#fff',
      'font-gray': '#a2a2a2',
      'font-medium-gray': '#efefef',
      'font-dark': '#000',
      'background-light': '#fff',
      'background-dark': '#000',
      'action': '#0095f6',
      'danger': '#ed4956',
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}