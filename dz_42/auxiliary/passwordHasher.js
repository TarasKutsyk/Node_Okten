const bcrypt = require('bcrypt');
const { PASSWORD_SALT_VALUE } = require('../config');
const { BAD_LOGIN } = require('../constants/errors/errorMessages');

module.exports = {
    hash: (password) => bcrypt.hash(password, PASSWORD_SALT_VALUE),
    compare: async (password, hash) => {
        const doesPasswordEqual = await bcrypt.compare(password, hash);

        if (!doesPasswordEqual) {
            throw new Error(BAD_LOGIN);
        }
    }
};
