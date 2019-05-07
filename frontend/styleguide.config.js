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
  assetsDir: './public/',
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

          --black: #242424;
          --light-black: #434343;

          --border-radius: 0.375rem;
          --input-box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
          --input-box-shadow-on-focus: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
          --drop-shadow: 0px 0px 2rem 0px rgba(136, 152, 170, 0.15);
          --shadow-color: rgba(136, 152, 170, 0.15);

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
