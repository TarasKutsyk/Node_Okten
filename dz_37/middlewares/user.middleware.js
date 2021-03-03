const errorMsg = require('../constants/errors/errorMessages');
const errorCodes = require('../constants/errors/errorCodes');
const userService = require('../services/userService');
const userValidator = require('../validators/user/create_user_validator');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const { error } = userValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
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
