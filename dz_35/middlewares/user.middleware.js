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
    areParamsValid: async (req, res, next) => {
        const {preferL = 'en'} = req.body;
        const queryParams = req.query;
        req.noQuery = Object.keys(queryParams).length === 0;

        if (!req.noQuery) {
            try {
                let areParamsValid = await userService.doesUserExist(queryParams);
                if (!areParamsValid)
                    throw new Error(errorMsg.USER_NOT_FOUND[preferL]);
            } catch (e) {
                res.status(errorCodes.NOT_FOUND).json(e.message);
            }
        }

        next();
    },

    isUserIdValid: async (req, res, next) => {
        const userId = +req.body.userId;
        try {
            const {preferL = 'en'} = req.body;
            const isValid = await userService.isIdValid(userId);
            if (!isValid) {
                throw new Error(errorMsg.INVALID_ID[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
}
