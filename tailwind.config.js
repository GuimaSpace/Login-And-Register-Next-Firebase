/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,tsx,jsx,css,scss}",
    "./components/**/*{js,ts,tsx,jsx,css,scss}",
    "./pages/**/*{js,ts,tsx,jsx,css,scss}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
    },
  },
  plugins: [],
}
