/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-link': '#9BFF00',
        'color-link-visited': '#7CDB00',
        bg: {
          dark: '#111111',
          'item-bg': '#1D1D1D',
        },
        color: {
          'icon-secondary': '#696969',
        },
      },
    },
  },
  plugins: [],
};
