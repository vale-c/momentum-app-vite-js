/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    textShadow: {
      'soft-black': '1px 2px 6px rgba(0, 0, 0, 0.2)'
    }
  },
  plugins: [require('tailwindcss-textshadow')]
}
