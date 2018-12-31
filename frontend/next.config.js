const { parsed: localEnv } = require('dotenv').config();
const withOffline = require('next-offline');
const withCss = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const nextConfig = {
  publicRuntimeConfig: {
    ...process.env,
    ...localEnv
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(raw)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'raw-loader',
    });
    if (config.mode === 'production') {
      if (Array.isArray(config.optimization.minimizer)) {
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
      }
    }
    return config;
  }
}

module.exports = withPlugins([
  [withCss, {}],
  [withOffline, {}]
], nextConfig);