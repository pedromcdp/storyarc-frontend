/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'api-assets.ua.pt',
      'media-cdn.tripadvisor.com',
      'www.evasoes.pt',
    ],
  },
};

module.exports = nextConfig;
