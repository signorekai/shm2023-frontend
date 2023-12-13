/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

const widths = {
  '15': '3.75rem',
  '18': '4.5rem',
  '22': '5.5rem',
  '30': '7.5rem',
  '56': '14rem',
  '360': '90rem',
  '400': '100rem',
  '420': '105rem',
  '480': '120rem',
  'infinite': '240rem',
  '9/16': '56.25%'
}

module.exports = {
  content: ['./src/**/*.{html,js,astro}', './whitelist.txt'],
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
      blue: '#394596',
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
      animation: {
        'button': 'button 0.4s ease-out forwards',
        'slide-in': 'slide-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s both',
      },
      keyframes: {
        "slide-in": {
          '0%': { transform: 'translateY(-100%)', opacity: 0},
          '100%': { transform: 'translateY(0)', opacity: 1}
        },
        button: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        }
      },
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

