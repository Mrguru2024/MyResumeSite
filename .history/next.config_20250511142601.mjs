/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        // Add any custom Turbopack rules here
      },
    },
  },
  turbopack: {
    // Add any custom Turbopack options here
  },
};

export default nextConfig;
