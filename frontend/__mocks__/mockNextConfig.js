const { parsed: localEnv } = require('dotenv').config();

module.exports = {
  publicRuntimeConfig: {
    API_URL: localEnv.API_URL,
    SITE_NAME: 'GOEN Maracaibo'
  }
}