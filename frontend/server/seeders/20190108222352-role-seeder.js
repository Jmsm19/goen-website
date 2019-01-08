module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'admin',
        },
        {
          name: 'instructor',
        },
        {
          name: 'assistant',
        },
        {
          name: 'student',
        },
      ],
      {},
    ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {}),
};
