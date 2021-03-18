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
    display: ['group-hover', 'group-focus'],
    extend: {
      borderRadius: ['focus'],
      transitionDuration: ['hover', 'focus'],
    },
  },
  plugins: [],
};
