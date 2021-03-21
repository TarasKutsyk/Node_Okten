const {SQL_DATABASE_NAME, SQL_HOST, SQL_USER_NAME, SQL_USER_PASSWORD} = require('./index');

module.exports = {
    development: {
        username: SQL_USER_NAME,
        password: SQL_USER_PASSWORD,
        database: SQL_DATABASE_NAME,
        host: SQL_HOST,
        dialect: 'mysql'
    }
};
