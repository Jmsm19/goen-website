module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Clans',
      [
        {
          name: 'Kani',
        },
        {
          name: 'Saru',
        },
        {
          name: 'Usagi',
        },
        {
          name: 'Kame',
        },
        {
          name: 'Tanuki',
        },
        {
          name: 'Kitsune',
        },
        {
          name: 'Buta',
        },
        {
          name: 'Kotori',
        },
      ],
      {},
    ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Clans', null, {}),
};
