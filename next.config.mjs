/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    turbo: {
      rules: {
        // Configure Turbopack rules here
      },
    },
  },
  turbopack: {
    rules: {
      // Configure Turbopack rules here
    },
  },
};

export default nextConfig;
