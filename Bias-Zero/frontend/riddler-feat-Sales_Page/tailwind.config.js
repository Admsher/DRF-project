/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        imgSlideIn: {
          "0%": { marginBottom: "-100%", opacity: "0" },
          "100%": { marginBottom: "0%", opacity: "1" },
        },
        dashSlideIn: {
          "0%": { marginLeft: "-100%", opacity: "0" },
          "100%": { marginLeft: "0%", opacity: "1" },
        },
        dashboardSlideDown: {
          "0%": { marginTop: "-100%", opacity: "0" },
          "100%": { marginTop: "0%", opacity: "1" },
        },
        slideDown: {
          "0%": {
            opacity: "0.2",
          },
          "100%": {
            opacity: "1",
          },
        },
        underlineGrow: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        imgSlideIn: "imgSlideIn 2s ease-in-out",
        dashSlideIn: "dashSlideIn 2s ease-in-out",
        dashboardSlideDown: "dashboardSlideDown 2s ease-in-out",
        expandEnter: "slideDown 0.3s forwards ease-in-out",
        underlineGrow: "underlineGrow 0.3s ease-in-out",
        fadeIn: "fadeIn 2s ease-in-out",
      },
      boxShadow: {
        dashboard: "0px 10px 30px rgba(157, 2, 253, 0.585)",
        other: "10px 0px 1px rgba(83, 128, 251, 0.623)",
        smokey: "0 10px 20px rgba(0, 0, 0, 0.6), 0 6px 6px rgba(0, 0, 0, 0.6)",
      },
      colors: {
        "btn-blue": "#4754F0",
        "main-blue": "#32B0F8",
        "second-blue": "#1A73E8",
        "main-grey": "#D9D9D9",
        "second-grey": "#E8E3E3",
        "dark-mode-blue": "#2A52BE",
        "dark-mode-navy": "#0A2351",
        "dark-mode-mint": "#4AA08D",
        "off-white": "#F0F4F8",
      },
      maxWidth: {
        "custom-max-width": "470px",
        "animation-max-width": "578px",
      },
      maxHeight: {
        "animation-max-height": "1171px",
      },
      fontSize: {
        "list-title": "25px",
        "list-font": "22px",
        "list-rectangle": "30px",
      },
      screens: {
        "ultra-small": "290px",
        "very-small": "375px",
        "small-large": "1024px",
        "custom-between": "1100px",
        "medium-large": "1250px",
        "very-large": "1400px",
      },
    },
  },
  plugins: [],
};
