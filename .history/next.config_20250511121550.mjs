/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    turbo: {
      rules: {
        // Configure Turbopack rules here
      },
    },
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
