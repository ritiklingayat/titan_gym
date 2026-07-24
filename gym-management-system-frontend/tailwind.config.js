/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#08090d',
          card: '#11131a',
          red: '#ef233c',
          orange: '#ff7a18',
          yellow: '#ffd166',
        },
      },
      boxShadow: {
        glow: '0 0 35px rgba(255, 122, 24, 0.25)',
      },
    },
  },
  plugins: [],
};
