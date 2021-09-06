module.exports = {
  mode: "jit",
  purge: ["./src/**/*.tsx", "./src/**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pink: {
          50: "#fdfcfb",
          100: "#faeff2",
          200: "#f6cbe6",
          300: "#ec9ecb",
          400: "#ea6fac",
          500: "#df4b91",
          600: "#c93270",
          700: "#a22652",
          800: "#771b35",
          900: "#49111c",
        },
      },
    },
    fontfamily: {
      sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
