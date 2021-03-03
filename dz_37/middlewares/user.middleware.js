const errorMsg = require('../errors/errorMessages');
const errorCodes = require('../errors/errorCodes');
const userService = require('../services/userService');

module.exports = {
    isUserValid: (req, res, next) => {
        const {name, email, password, preferL = 'en'} = req.body;

        try {
            if (!(name && email && password)) {
                throw new Error(errorMsg.EMPTY_FIELD[preferL]);
            }

            if (password.length < 6) {
                throw new Error(errorMsg.TOO_WEAK_PASSWORD[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    doesUserExist: async (req, res, next) => {
        const {preferL = 'en', email} = req.body;

        try {
            const userExists = await userService.checkIfUserExistsByEmail(email);

            if (userExists) {
                throw new Error(errorMsg.USER_ALREADY_EXISTS[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    areParamsValid: async (req, res, next) => {
        const {preferL = 'en'} = req.body;
        const queryParams = req.query;
        req.noQuery = Object.keys(queryParams).length === 0;
        
        try {
            if (!req.noQuery) {
                const areParamsValid = await userService.doesUserExist(queryParams);

                if (!areParamsValid) {
                    throw new Error(errorMsg.USER_NOT_FOUND[preferL]);
                }
            }

            next();
        } catch (e) {
            res.status(errorCodes.NOT_FOUND).json(e.message);
        }
    },

    isUserIdValid: async (req, res, next) => {
        const {preferL = 'en'} = req.body;
        const {userId} = req.params;

        try {
            const isValid = await userService.isIdValid(userId);

            if (!isValid) {
                throw new Error(errorMsg.INVALID_ID[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
};
