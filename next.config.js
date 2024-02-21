/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "dpop.nyc3.digitaloceanspaces.com"],
  },
};

module.exports = nextConfig;
