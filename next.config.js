/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    swcMinify: false,
    styledComponents: true,
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
