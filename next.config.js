/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      'api-assets.ua.pt',
      'media-cdn.tripadvisor.com',
      'www.evasoes.pt',
      'lh3.googleusercontent.com',
      'i.pinimg.com',
      '3.bp.blogspot.com',
    ],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV !== 'development',
  },
});

module.exports = nextConfig;
