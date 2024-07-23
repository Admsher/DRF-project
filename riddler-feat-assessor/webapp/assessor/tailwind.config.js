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
      screens:{
        ultrasmall: "290px",
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
        'card-grad': 'linear-gradient(to bottom, #487CE2, #94B5F7)',
        'crcl-grad': 'linear-gradient(to bottom right, #E8EFFF 7%, #487CE2 64%, #243E71 100%)',
        'crcl2-grad': 'linear-gradient(to right, #487CE2 30%, #243E71 100%)',
        'crcl3-grad': 'linear-gradient(to right,  #E8EFFF 7%, #487CE2 54%, #243E71 100%)',
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

