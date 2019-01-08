const { development } = require('./sequelize.json');

module.exports = {
  port: 3000,
  db: {
    database: process.env.DATABASE_NAME || development.database,
    user: process.env.DATABASE_USER || development.username,
    password: process.env.DATABASE_PASSWORD || development.password,
    options: {
      dialect: process.env.DATABASE_DIALECT || development.dialect,
      host: process.env.HOST || development.host,
    },
  },
};
