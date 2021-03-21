module.exports = {
    MONGO_URL: 'mongodb://localhost/sep-2020',
    PORT: 5000,
    PASSWORD_SALT_VALUE: 10,
    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD,
    // --------------------------------------------------mySQL
    SQL_DATABASE_NAME: 'sep-2020',
    SQL_USER_NAME: 'root',
    SQL_USER_PASSWORD: 'root',
    SQL_HOST: 'localhost',
    SQL_USERS_TABLE: 'users'
};
