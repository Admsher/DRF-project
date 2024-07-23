/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
      },
      animation: {
        imgSlideIn: "imgSlideIn 2s ease-in-out",
        dashSlideIn: "dashSlideIn 2s ease-in-out",
        dashboardSlideDown: "dashboardSlideDown 2s ease-in-out",
      },
      boxShadow: {
        dashboard: "0px 10px 30px rgba(157, 2, 253, 0.585)",
        other: "10px 0px 1px rgba(83, 128, 251, 0.623)",
        smokey: "0 10px 20px rgba(0, 0, 0, 0.6), 0 6px 6px rgba(0, 0, 0, 0.6)",
      },
      colors: {
        "btn-blue": "#4754F0",
        "main-blue": "#32B0F8",
        "main-grey": "#D9D9D9",
        "dark-mode-navy": "#0A2351",
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
