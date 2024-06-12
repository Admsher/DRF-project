/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        drkblue: '#0D0B22',
        btnblue: '#4754F0',
        otpinpbg: '#D9D9D9',
        otpnnum: '#A790FA',
        litblue: '#4754F0',
        rylblue: '#243E71',
        ltgray: '#E8EFFF',
        ltblue: '#487CE2',
        mdblue: '#243E71',
        dkblue: '#121F39',
        dkgray: '#BABFCC',
      },
      width: {
        '520': '520px',
        '440': '440px',
      },
      height: {
        '440': '440px',
        '520': '520px',
      },
      backgroundImage: {
        'card-grad': 'linear-gradient(to bottom, #4754F0, #AE94FB)',
        'crcl-grad': 'linear-gradient(to right, #FFCCB8 26%, #AE94FB 100%)',
        'crcl2-grad': 'linear-gradient(to right, #AE94FB 10%, #4754F0 100%)',
        'crcl3-grad': 'linear-gradient(to right, #FFCCB8 6%, #AE94FB 50%)',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('preline/plugin'),
    function ({ addUtilities }) {
      addUtilities({
        '.no-spin::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        '.no-spin::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        '.no-spin': {
          '-moz-appearance': 'textfield',
          'appearance': 'textfield',
        },
      }, ['responsive', 'hover']);
    }
  ],
}

