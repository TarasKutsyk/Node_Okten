const JWT = require('jsonwebtoken');

const constants = require('../constants/tokens');
const secretWordsMatcher = require('../constants/secretWordsMatcher');

module.exports = (role = 'user') => {
    const matchingSecretWord = secretWordsMatcher[role];

    const access_token = JWT.sign({}, matchingSecretWord.ACCESS,
        { expiresIn: constants.ACCESS_TOKEN_EXPIRATION_TIME });

    const refresh_token = JWT.sign({}, matchingSecretWord.REFRESH,
        { expiresIn: constants.REFRESH_TOKEN_EXPIRATION_TIME });

    return {access_token, refresh_token};
};
