const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          background: "#ffffff",
          text: "#000000",
        },
        dark: {
          background: "#1a202c",
          text: "#a0aec0",
        },
        tomato: {
          background: "#ff6347",
          text: "#ffffff",
        },
      },
    },
  },
  plugins: [
    plugin(function ({addVariant}) {
      addVariant("tomato", ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.tomato .${className}`;
        });
      });
    }),
  ],
};
