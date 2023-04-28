/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-grey': '#323232',
        'main': '#151515',
        'main2': '#323232',
        'main3': '#383838',
        'yellow': '#ffa63d',
        'orange': '#fe8e23',
        'blue': '#00c0ff',
        'pink': '#f0725c',
        'greyish': '#434343'
      },
      spacing: {
        '0.01': '1px',
        '4.5': '4.5%',
        '128': '32rem',
        '185': '46rem',
      },
      fontSize: {
        '10xl': '13rem',
      },
      opacity: {
        '01': '.01',
      },
      letterSpacing: {
        tightest: '-.12em'
      },
      lineHeight: {
        tightest: '.75',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '998': '998',
        '999': '999',
      }
    },
    container: {
      center: true,
      screens: {
        // if the screen is smaller than 768 --> container is 100%
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      padding: {
        DEFAULT: '1rem',
        sm: '0',
      },
    },
  },
  plugins: [],
}