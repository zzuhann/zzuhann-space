/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fluffy-18025.web.app",
        port: "",
        pathname: "/static/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
