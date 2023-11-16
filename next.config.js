/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: true,
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
  webpack(config, options) {
    const { isServer } = options;

    // Exclude SVG files from the general rule
    const generalRule = {
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: /\.svg$/i,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    };

    // Rule for SVG files
    const svgRule = {
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    };

    // Add both rules to the configuration
    config.module.rules.push(generalRule, svgRule);

    return config;
  },
};

module.exports = nextConfig;
