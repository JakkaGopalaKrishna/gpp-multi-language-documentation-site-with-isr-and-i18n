/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use 'class' to make sure your ThemeToggle.tsx actually works
  darkMode: 'class', 
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // This covers UI and Docs folders
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // Required for the 'prose' class
  ],
};