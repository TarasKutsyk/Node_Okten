const {errorMsg, errorCodes, customErrorCodes} = require('../constants/errors');
const ErrorHandler = require('../auxiliary/errorHandler');

const {userQueryBuilder} = require('../auxiliary/queryBuilder');
const Product = require('../database/models/Product');

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
    
    buildResponseInfo: (req, res, next) => {
        const { limit = 20, page = 1, sortBy = 'name', order = 'asc' } = req.query;

        const offset = (page - 1) * limit;
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };

        req.responseInfo = {limit, page, sort, offset};

        next();
    },

    buildQueryParams: async (req, res, next) => {
        const {preferL = 'en'} = req.body;
        // eslint-disable-next-line no-unused-vars
        const { limit = 20, page = 1, sortBy = 'name', order = 'asc', ...queryFilters } = req.query;

        try {
            if (!Object.keys(req.query).length) {
                req.noQuery = true;
            } else {
                req.noQuery = false;
                req.query = userQueryBuilder(queryFilters);

                if (req.query.product) {
                    const productFound = await Product.findOne({name: req.query.product});

                    if (!productFound) {
                        throw new ErrorHandler(errorMsg.USER_NOT_FOUND[preferL],
                            errorCodes.NOT_FOUND, customErrorCodes.NOT_FOUND);
                    }

                    delete req.query.product;

                    req.query.products = productFound._id;
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    areParamsValid: async (req, res, next) => {
        const {preferL = 'en'} = req.body;
        const queryParams = req.query;

        try {
            if (!req.noQuery) {
                const areParamsValid = await userService.doesUserExist(queryParams);

                if (!areParamsValid) {
                    throw new ErrorHandler(errorMsg.USER_NOT_FOUND[preferL],
                        errorCodes.NOT_FOUND, customErrorCodes.NOT_FOUND);
                }
            }

            next();
        } catch (e) {
            next(e);
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
