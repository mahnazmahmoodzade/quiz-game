const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        primary: colors.rose,
      },
    },
  },
  plugins: [require("@specific-group/spg-design-system/plugin/global.config")],
};
