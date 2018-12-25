const { parsed: localEnv } = require('dotenv').config();
const withOffline = require('next-offline');

const nextConfig = {
  publicRuntimeConfig: {
    ...process.env,
    ...localEnv
  }
}

module.exports = withOffline(nextConfig);