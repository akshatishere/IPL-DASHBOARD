/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './constants/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ipl-blue': '#1e3a8a',
        'ipl-orange': '#ea580c',
        'cricket-green': '#16a34a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-blue-500',
    'bg-yellow-500', 
    'bg-red-500',
    'bg-purple-500',
    'bg-blue-600',
    'bg-red-600',
    'bg-pink-500',
    'bg-orange-500',
    'bg-blue-400',
    'bg-green-500',
    'bg-gray-500'
  ]
} 