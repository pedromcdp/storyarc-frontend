module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
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
  },
};
