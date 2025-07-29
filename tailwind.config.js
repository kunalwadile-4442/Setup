/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend: {
      colors: {

        darkbg: '#373232',
        primaryVeryLight:'rgb(17 169 222 / 15%);',
        primaryLight:'rgb(17 169 222 / 18%);',
        primary: '#0DAEE5',
        primaryHover: "rgb(17 155 202);",
        primaryLoader: '#6CCCED'
      },
       boxShadow: {
        'custom-light': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'custom-medium': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'custom-heavy': '0 6px 20px rgba(0, 0, 0, 0.2)',
        'custom-colored': '0 4px 10px rgba(59, 130, 246, 0.4)', // example with Tailwind blue
      },
      maxHeight: {
      '0': '0',
      '40': '10rem',
    },
    transitionProperty: {
      'height': 'max-height',
    },
    },
  },
  plugins: [],
}