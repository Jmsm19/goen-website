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
  theme: {
    fontSize: {
      base: '1.4rem',
    },
  },
  assetsDir: './src/assets/',
};
