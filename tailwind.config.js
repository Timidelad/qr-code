/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        myFont: ['Roboto', 'sans-serif'],
      },
      colors: {
        bgColor: '#F8F8F6',
        activeColor: '#6984F4',
        inActiveColor: '#C1CBF6',
        inputColor: '#262626',
        inputBg: '#D0D7F0',
        imgContainer: '#ADBBF3',
      },
    },
  },
  plugins: [],
}

