/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fluffy-18025.web.app',
        port: '',
        pathname: '/static/media/**',
      },
    ],
  },
};

module.exports = nextConfig;
