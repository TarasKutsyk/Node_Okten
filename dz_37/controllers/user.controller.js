const errorCodes = require('../constants/errors/errorCodes');
const errorMsg = require('../constants/errors/errorMessages');
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
        const {password} = req.body;

        try {
            const hashPassword = await passwordHasher.hash(password);

            await userService.addNewUser({ ...req.body, password: hashPassword });

            res.json('User added!');
        } catch (e) {
            res.status(errorCodes.DATABASE_ERROR).json(`${errorMsg.DATABASE_WRITE_ERROR}: ${e.message}`);
        }
    },

    deleteUser: (req, res) => {
        const {userId} = req.params;

        try {
            userService.deleteUser(userId);

            res.json('User deleted!');
        } catch (e) {
            res.status(errorCodes.DATABASE_ERROR).json(`${errorMsg.DATABASE_WRITE_ERROR}: ${e.message}`);
        }
    }
};
