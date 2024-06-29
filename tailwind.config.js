/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'primary': '#021460',
        'secondary': '#3490dc',
        'main-blue': '#021460',
        'light-blue': '#031b7d',
        'main-red': '#E3042E'
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        'sidebar': '700ms',
      },
      "color": {
        "failure": "fill-red-600",
        "gray": "fill-gray-600",
        "info": "fill-cyan-600",
        "pink": "fill-pink-600",
        "purple": "fill-purple-600",
        "success": "fill-green-500",
        "warning": "fill-yellow-400",
        'main-blue': '#021460',
        'main-red': '#E3042E'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

