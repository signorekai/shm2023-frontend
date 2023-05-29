/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

const widths = {
  '15': '3.75rem',
  '18': '4.5rem',
  '22': '5.5rem',
  '30': '7.5rem',
  '56': '14rem',
  '1920': '120rem',
  'infinite': '240rem',
  '9/16': '56.25%'
}

module.exports = {
  content: ['./src/**/*.{html,js,astro}'],
  theme: {
    fontFamily: {
      'apercu': ['Apercu', 'apercu', ...defaultTheme.fontFamily.sans],
      'gt-pressura': ['GT Pressura', 'gt-pressura', ...defaultTheme.fontFamily.sans]
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      black: '#1A1A1A',
      green: '#4c9053',
      yellow: '#FFD980',
      white: {
        DEFAULT: '#ffffff',
        off: '#F2F1EE'
      },
      grey: {
        DEFAULT: "#575757",
        light: '#E8E8E8',
        scrollbar: '#d9d9d9'
      }
    },
    extend: {
      borderWidth: {
        '1': '1px',
      },
      maxWidth: widths,
      spacing: widths,
      width: widths,
      screens: {
        'wide': '1920px',
      },
      lineHeight: {
        '12': '3rem',
      },
      fontSize: {
        '3xl': '2rem',
      },
      gridColumnStart: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
      },
      gridColumnEnd: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 1fr))',
        // Complex site-specific column configuration
      }
    }
  },
  plugins: [],
}

