const errorCodes = require('../constants/errors/errorCodes');
const errorMsg = require('../constants/errors/errorMessages');
const emailActions = require('../constants/emailActions');
const mailService = require('../services/mailService');
const successMsg = require('../constants/successMessages');
const userService = require('../services/userService');
const passwordHasher = require('../auxiliary/passwordHasher');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(errorCodes.DATABASE_ERROR).json(errorMsg.DATABASE_READ_ERROR);
        }
    },

    getUserById: async (req, res) => {
        const {userId} = req.params;

        try {
            const user = await userService.getUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.NOT_FOUND).json(e.message);
        }
    },

    addNewUser: async (req, res) => {
        const {password, email, name} = req.body;

        try {
            const hashPassword = await passwordHasher.hash(password);

            await userService.addNewUser({ ...req.body, password: hashPassword });

            await mailService.sendMail(email, emailActions.WELCOME, {userName: name});

            res.json(successMsg.USER_ADDED);
        } catch (e) {
            res.status(errorCodes.DATABASE_ERROR).json(`${errorMsg.DATABASE_WRITE_ERROR}: ${e.message}`);
        }
    },

    deleteUser: async (req, res) => {
        const {userId} = req.params;
        const {preferL = 'en'} = req.body;

        try {
            if (userId !== req.user.id) {
                throw new Error(errorMsg.BAD_TOKEN[preferL]);
            }

            const user = await userService.getUserById(userId);
            await mailService.sendMail(user.email, emailActions.GOODBYE, {userName: user.name});

            userService.deleteUser(userId);

            res.json(successMsg.USER_DELETED);
        } catch (e) {
            res.status(errorCodes.UNAUTHORIZED).json(e.message);
        }
    }
};
