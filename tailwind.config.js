/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container:{
        center: true
      },
      colors: {
        'primary-100': '#EDD8FF',
        'primary-200': '#DBB1FF',
        'primary-300': '#C98BFF',
        'primary-400': '#B764FF',
        'primary-500': '#A53DFF',
        'primary-600': '#8431CC',
        'primary-700': '#632599',
        'primary-800': '#421866',
        'primary-900': '#210C33',
      }
    },
  },
  plugins: [],
}

