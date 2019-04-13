const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');

const { generateCSSReferences, generateJSReferences } = MiniHtmlWebpackPlugin;

module.exports = {
  components: 'src/components/**/index.js',
  pagePerSection: true,
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: 'UI Components',
      components: 'src/components/UI/**/index.js',
    },
    {
      name: 'Layout Components',
      components: 'src/components/Layout/**/index.js',
    },
  ],
  theme: {},
  assetsDir: './src/assets/',
  template: ({ css, js, title, publicPath }) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,600" rel="stylesheet" />
        <style>
        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary-color: #bf1a21;
          --light-primary-color: #ff4050;
          --light-obscure-primary-color: #d9091a;
          --normal-color: #f0f0f0;

          --success-color: #2dce89;
          --danger-color: #f5365c;
          --warning-color: #fb6340;

          --tablet-size: 768px;
          --phone-size: 576px;
        }

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
        }
      </style>
      ${generateCSSReferences(css, publicPath)}
      </head>
      <body>
        <div id="rsg-root"></div>
        ${generateJSReferences(js, publicPath)}
      </body>
    </html>`,
};
