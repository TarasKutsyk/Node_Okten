module.exports = {
    MONGO_URL: 'mongodb://localhost/sep-2020',
    PORT: 5000,
    PASSWORD_SALT_VALUE: 10,
    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD,
    TOKENS_DAYS_TO_EXPIRE: 10
};
