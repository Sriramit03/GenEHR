/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        black:"#0D2438",
        blue:"#4894FE",
        grey:"#D9D9D9",
        bgColor:"#F0F8FF",
        ctransparent:"#000000",
        borderColor:"#a1c9d7",
        orange:"#ffad82"
      },
      fontFamily:{
        ibold:["ibm-bold"],
        imedium:["ibm-semibold"],
        iregular:["ibm-regular"],
      }
    },
  },
  plugins: [],
}