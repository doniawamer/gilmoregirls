/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["@acme/ui"],
    appDir: true,
  },
};

module.exports = nextConfig;
