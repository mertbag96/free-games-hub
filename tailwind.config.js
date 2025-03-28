/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['Ubuntu', 'sans-serif'],
      },
      minHeight: {
        'page': 'calc(100dvh - 130px)',
      },
      colors: {
        primary: '#ef4c4f',
        secondary: '#003556'
      },
    },
  },
  plugins: [],
}

