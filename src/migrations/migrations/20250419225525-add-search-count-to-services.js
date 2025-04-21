module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('services', 'search_count', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('services', 'search_count');
  },
};
