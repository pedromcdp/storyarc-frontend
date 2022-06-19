module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '828px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        verde: '#37B780',
        azul: '#133960',
        preto: '#000000',
        branco: '#FFFFFF',
      },
      fontFamily: {
        body: ['Poppins'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    base: false,
    themes: [
      {
        mytheme: {
          primary: '#FFFFFF',
          secondary: '#37B780',
          accent: '#FFFFFF',
          neutral: '#37B780',
          'base-100': '#ffffff',
        },
      },
    ],
  },
};
