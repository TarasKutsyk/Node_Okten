const errorCodes = require('../errors/errorCodes');
const errorMsg = require('../errors/errorMessages');
const userService = require('../services/userService');

module.exports = {
    getUsers: async (req, res) => {
        try {
            let users = await userService.getAllUsers();

            if (!req.noQuery) {
                const queryParams = req.query;
                users = users.filter((user) => userService.doesMatchQueryParams(user, queryParams));
            }

            res.json(users);
        } catch (e) {
            res.status(errorCodes.DATABASE_ERROR).json(`${errorMsg.DATABASE_READ_ERROR}: ${e.message}`);
        }
    },

    addNewUser: (req, res) => {
        try {
            const newUser = req.body;
            userService.addNewUser(newUser);

            res.json('User added!');
        } catch (e) {
            res.status(errorCodes.DATABASE_ERROR).json(`${errorMsg.DATABASE_WRITE_ERROR}: ${e.message}`);
        }
    },

    deleteUser: (req, res) => {
        const userId = +req.body.userId;

        try {
            userService.deleteUser(userId);

            res.json('User deleted!');
        } catch (e) {
            res.status(errorCodes.DATABASE_ERROR).json(`${errorMsg.DATABASE_WRITE_ERROR}: ${e.message}`);
        }
    }
};
