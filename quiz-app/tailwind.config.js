/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'construction-orange': '#F57C00',
        orange: '#EE410B',
        'slate-grey': '#64748b',
      },
    },
  },
  plugins: [],
}
