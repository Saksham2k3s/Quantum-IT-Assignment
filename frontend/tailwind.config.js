
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A73E8',        
        secondary: '#FFB703',
        dark: '#253452',
        light: '#00f5e1',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],  
        heading: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-dark-light': 'linear-gradient(to top, #00BDB9 30%, #009FA2 55%,  #007886 80%)'
      },
      backgroundColor: {
        'form-bg': '#253452',
        'input-bg' : '#4d5974'
      }
    },
  },
  plugins: [],
}

