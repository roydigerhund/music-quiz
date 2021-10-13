const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.tsx', './src/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fdfcfb',
          100: '#faeff2',
          200: '#f6cbe6',
          300: '#ec9ecb',
          400: '#ea6fac',
          500: '#df4b91',
          600: '#c93270',
          700: '#a22652',
          800: '#771b35',
          900: '#49111c',
        },
      },
      boxShadow: {
        'button': '0 4px 0 0 #a22652',
        'button-hover': '0 2px 0 0 #a22652',
        'button-disabled': '0 4px 0 0 ' + colors.coolGray[700],
      },
    },
    screens: {
      xxs: '360px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontfamily: {
      sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
