const { errorCodes, customErrorCodes, errorMsg } = require('../constants/errors');
const ErrorHandler = require('../auxiliary/errorHandler');
const { mySQL_userService } = require('../services');
const {transactionInstance} = require('../database/mySQL');

const successMsg = require('../constants/successMessages');

module.exports = {
    createUser: async (req, res) => {
        const transaction = await transactionInstance();

        try {
            await mySQL_userService.createUser(req.body);

            await transaction.commit();

            res.json(successMsg.USER_ADDED);
        } catch (e) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const {preferL = 'en'} = req.body;

            const users = await mySQL_userService.findAllUsers(req.query);

            if (!users.length) {
                throw new ErrorHandler(errorMsg.USERS_NOT_FOUND[preferL], errorCodes.BAD_REQUEST, customErrorCodes.NOT_FOUND);
            }

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        const {id} = req.params;
        const {preferL = 'en'} = req.body;

        try {
            const user = await mySQL_userService.findUserById(id);

            if (!user.length) {
                throw new ErrorHandler(errorMsg.USER_NOT_FOUND[preferL], errorCodes.BAD_REQUEST, customErrorCodes.NOT_FOUND);
            }

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        const {id} = req.params;
        const {preferL = 'en'} = req.body;

        const transaction = await transactionInstance();
        try {
            const usersDeleted = await mySQL_userService.deleteUserById(id);

            if (!usersDeleted) {
                throw new ErrorHandler(errorMsg.INVALID_ID[preferL], errorCodes.BAD_REQUEST, customErrorCodes.NOT_FOUND);
            }

            await transaction.commit();
            res.json(successMsg.USER_DELETED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
};
