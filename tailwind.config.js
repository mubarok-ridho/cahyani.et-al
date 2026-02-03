/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'twinkle': 'twinkle 8s infinite',
        'float-bubble': 'floatBubble 6s ease-in-out infinite',
        'money-flow': 'moneyFlow 4s ease-in-out infinite',
        'rotate-colors': 'rotateColors 8s linear infinite',
        'slide-up': 'slideUp 0.6s ease',
        'fade-in': 'fadeIn 0.5s ease',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}