const errorCodes = require('../errors/errorCodes');
const errorMsg = require('../errors/errorMessages');
const userService = require('../services/userService');

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
        const user = req.body;

        try {
            await userService.addNewUser(user);

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
