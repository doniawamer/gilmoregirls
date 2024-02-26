/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      displayName: false,
    },
  },
  experimental: {
    serverComponentsExternalPackages: ["@acme/ui"],
  },
};

module.exports = nextConfig;
