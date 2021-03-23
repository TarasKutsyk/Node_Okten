module.exports = {
    user:
        {
            ACCESS: process.env.USER_ACCESS_TOKEN_PRIVATE_KEY,
            REFRESH: process.env.USER_REFRESH_TOKEN_PRIVATE_KEY,
        },
    admin:
        {
            ACCESS: process.env.ADMIN_ACCESS_TOKEN_PRIVATE_KEY,
            REFRESH: process.env.ADMIN_REFRESH_TOKEN_PRIVATE_KEY,
        },
};
console.log(module.exports);
