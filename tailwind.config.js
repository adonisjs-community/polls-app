module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    colors: {
      white: '#fff',
      red: {
        600: '#F33330',
      },
      gray: {
        800: '#2C2B2A',
        500: '#72716D',
        300: '#DBD9D2',
        200: '#C1BFB9',
        100: '#E7E5E0',
        50: '#F8F7F6',
      },
      teal: {
        700: '#09847E',
        600: '#0B9D96',
      },
    },
    boxShadow: {
      DEFAULT: '0px 2px 4px rgba(44, 43, 42, 0.1)',
      spread: '0px 12px 32px rgba(44, 43, 42, 0.16)',
    },
    minWidth: {
      240: '240px',
    },
    extend: {
      fontSize: {
        'xl': ['1.375rem', '2.125rem'],
        '6xl': ['3.625rem', '4rem'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
