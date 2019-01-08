module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('RoleUser', {
      id: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      },
      RoleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('RoleUser'),
};
