const JWT = require('jsonwebtoken');

const constants = require('../constants/tokens');

module.exports = () => {
    const access_token = JWT.sign({}, process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: constants.ACCESS_TOKEN_EXPIRATION_TIME });

    const refresh_token = JWT.sign({}, process.env.REFRESH_TOKEN_PRIVATE_KEY,
        { expiresIn: constants.REFRESH_TOKEN_EXPIRATION_TIME });

    return {access_token, refresh_token};
};
