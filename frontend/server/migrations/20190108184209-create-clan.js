module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Clans', {
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
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Clans'),
};
