const errorCodes = require('../constants/errors/errorCodes');
const authService = require('../services/authService');
const {tokenizer} = require('../auxiliary');

module.exports = {
    generateNewTokensForUser: async (req, res) => {
        const {user} = req;

        try {
            const tokens = tokenizer();

            await authService.createToken({...tokens, user: user._id});

            res.json(tokens);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
