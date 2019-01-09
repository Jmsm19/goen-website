const { parsed: localEnv } = require('dotenv').config();
const withOffline = require('next-offline');
const withCss = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const nextConfig = {
  publicRuntimeConfig: {
    ...process.env,
    ...localEnv,
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
  },
};

module.exports = withPlugins(
  [
    [withCss, {}],
    [
      withOffline,
      {
        workboxOpts: {
          swDest: 'static/root/service-worker.js',
          runtimeCaching: [
            {
              urlPattern: /static\/locales\/*/,
              handler: 'networkFirst',
              options: {
                cacheName: 'locales',
                networkTimeoutSeconds: 15,
                expiration: {
                  maxAgeSeconds: 1, // 1 month
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https?.*/,
              handler: 'networkFirst',
              options: {
                cacheName: 'https-calls',
                networkTimeoutSeconds: 15,
                expiration: {
                  maxEntries: 150,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      },
    ],
  ],
  nextConfig,
);
