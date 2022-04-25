/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
