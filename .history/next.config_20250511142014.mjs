/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    turbo: {
      rules: {
        // Add any custom Turbopack rules here
      },
    },
  },
};

export default nextConfig;
