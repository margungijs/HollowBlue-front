/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      custom: {
        'border-purple': {
          borderWidth: '2px',
          borderColor: 'rgb(107, 33, 168)',
        }
      }
    },
  },
  plugins: [],
}
