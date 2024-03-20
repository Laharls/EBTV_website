/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'light-mode': "url(/bg_light_desktop.webp)",
        'dark-mode': "url(/bg_dark_desktop.png)",
        'phone-light-mode': "url(/bg_light_mobile.png)",
        'phone-dark-mode': "url(/bg_dark_mobile.png)",
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ['dark'],
    },
  },
  plugins: [],
};
