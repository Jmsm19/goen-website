const { parsed: localEnv } = require('dotenv').config();
const withOffline = require('next-offline');
const withLess = require('@zeit/next-less');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const withPlugins = require('next-compose-plugins');

const themeVariables = lessToJs(
  fs.readFileSync(path.resolve(__dirname, './styles/a-theme.less'), 'utf8'),
);
// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

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
        // config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
      }
    }
    return config;
  },
};

module.exports = withPlugins(
  [
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables,
        },
      },
    ],
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
