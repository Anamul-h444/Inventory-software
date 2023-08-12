/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        changeColor: {
          "100%": {
            filter: "hue-rotate(360deg)",
          },
        },
        moveInLeft: {
          "0%": {
            opacity: 0,
            transform: "translateX(-10rem)",
          },

          "80%": {
            transform: "translateX(1rem)",
          },

          "100%": {
            opacity: "1",
            transform: " translateX(0)",
          },
        },

        moveInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(10rem)",
          },

          " 80%": {
            transform: "translateX(-1rem)",
          },

          " 100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },

        moveInBottom: {
          "0%": {
            opacity: "0",
            transform: "translateY(3rem)",
          },

          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        moveInTop: {
          "0%": {
            opacity: "0",
            transform: "translateY(-1rem)",
          },

          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        loaderAnimation: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        changeColor: "changeColor 5s linear infinite",
        moveInLeft: "moveInLeft 1s ease-in-out",
        moveInRight: "moveInRight 1s ease-in-out",
        moveInBottom: "moveInBottom 1s ease-in-out",
        moveInTop: "moveInTop 1s ease-in-out",
      },
    },
  },
  plugins: [require("daisyui")],
};
