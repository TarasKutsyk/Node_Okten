const {SQL_USERS_TABLE} = require('../../../config');
// const {DataTypes} = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(SQL_USERS_TABLE, 'age', { type: Sequelize.DataTypes.INTEGER });
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn(SQL_USERS_TABLE, 'age');
    }
};
