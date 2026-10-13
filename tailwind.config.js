/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#A3A6FF',
          400: '#7478FF',
          500: '#5256FF',
          600: '#3F43E0',
        },
        bg: '#0C1014',
        surface: '#141A21',
        'surface-2': '#1C232B',
        border: '#25292E',
        text: '#FFFFFF',
        'text-muted': '#8589A8',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(116,120,255,0.35), 0 30px 80px rgba(82,86,255,0.25)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

