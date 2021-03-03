const errorCodes = require('../constants/errors/errorCodes');
const errorMsg = require('../constants/errors/errorMessages');
const userService = require('../services/userService');
const passwordHasher = require('../auxiliary/passwordHasher');

module.exports = {
    loginUser: async (req, res) => {
        const {email, password} = req.body;

        try {
            const user = await userService.getUserByEmail(email);

            if (!user) {
                throw new Error(errorMsg.BAD_LOGIN);
            }

            await passwordHasher.compare(password, user.password);

            res.json('Logged in successfully');
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
