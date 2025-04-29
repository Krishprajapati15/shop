/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "cupcake","dark"],
  },
  plugins: [require("daisyui")],
  darkMode: ['class', '[data-theme="dark"]']
}

