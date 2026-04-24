/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#02132e',
        'surface': '#0f1f3b',
        'surface-high': '#253552',
        'accent': '#00f2ff',
        'on-surface': '#d7e2ff',
        'on-surface-variant': '#b9cacb',
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
