module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a2129',
        },
      },
    },
  },
  variants: {
    display: ['group-hover'],
    extend: {
      display: ['responsive'],
    },
  },
  plugins: [],
};
