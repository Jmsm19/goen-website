const { Clan } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nationalId: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      emailVerifiedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      birthDate: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      clanId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      activationToken: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
