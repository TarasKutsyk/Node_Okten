const {Sequelize} = require('sequelize');
const {SQL_DATABASE_NAME, SQL_HOST, SQL_USER_NAME, SQL_USER_PASSWORD} = require('../../config');

const sequelize = new Sequelize(SQL_DATABASE_NAME, SQL_USER_NAME, SQL_USER_PASSWORD, {
    host: SQL_HOST,
    dialect: 'mysql'
});

module.exports = {
    sequelize,
    transactionInstance: () => sequelize.transaction()
};
