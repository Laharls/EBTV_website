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
        'dark-mode': "url(/bg_dark_desktop.webp)",
        'phone-light-mode': "url(/bg_light_mobile.webp)",
        'phone-dark-mode': "url(/bg_dark_mobile.webp)",
      },
      screens: {
        'xsm': '500px',
        'xlg': '900px',
      }
    },
  },
  variants: {
    extend: {
      backgroundImage: ['dark'],
    },
  },
  plugins: [],
};
