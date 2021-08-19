module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./resources/views/**/*.edge', './resources/views/*.edge'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    colors: {
      white: '#fff',
      red: {
        600: '#F33330',
        700: '#CC2B28',
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
        800: '#075E5A',
        700: '#09847E',
      },
      green: {
        700: '#118C37',
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
      minHeight: {
        shell: 'calc(100vh - 97px - 64px)',
      },
      fontSize: {
        'xl': ['1.375rem', '2.125rem'],
        '6xl': ['3.625rem', '4rem'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
