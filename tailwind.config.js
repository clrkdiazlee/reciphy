/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./global.css",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#E76F51",
        secondary: "#F4A261",
        accent: "#2A9D8F",
        background: "#FFF8F3",
        text: "#2B2B2B",
      },

      fontFamily: {
        nunito: ["Nunito_400Regular"],
        fredoka: ["Fredoka_400Regular"],

        "nunito-medium": ["Nunito_500Medium"],
        "nunito-semibold": ["Nunito_600SemiBold"],
        "nunito-bold": ["Nunito_700Bold"],
        
        "fredoka-medium": ["Fredoka_500Medium"],
        "fredoka-semibold": ["Fredoka_600SemiBold"],
        "fredoka-bold": ["Fredoka_700Bold"],
      },
    },
  },
};