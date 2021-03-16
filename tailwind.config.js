module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    display: ['group-hover', 'group-focus'],
    extend: {
      borderRadius: ['focus'],
      transitionDuration: ['hover', 'focus'],
    },
  },
  plugins: [],
};
