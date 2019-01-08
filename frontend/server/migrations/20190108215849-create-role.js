module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Roles'),
};
