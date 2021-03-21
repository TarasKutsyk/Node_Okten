const {errorMsg, errorCodes, customErrorCodes} = require('../constants/errors');
const ErrorHandler = require('../auxiliary/errorHandler');
const {productQueryBuilder} = require('../auxiliary/queryBuilder');
const {productService} = require('../services');

module.exports = {
    buildQueryParams: (req, res, next) => {
        // eslint-disable-next-line no-unused-vars
        const { limit = 20, page = 1, sortBy = 'name', order = 'asc', ...queryFilters } = req.query;

        if (!Object.keys(req.query).length) {
            req.noQuery = true;
        } else {
            req.noQuery = false;
            req.query = productQueryBuilder(queryFilters);
        }

        next();
    },

    areParamsValid: async (req, res, next) => {
        const {preferL = 'en'} = req.body;
        const queryParams = req.query;

        try {
            if (!req.noQuery) {
                const areParamsValid = await productService.doesProductExist(queryParams);

                if (!areParamsValid) {
                    throw new ErrorHandler(errorMsg.PRODUCT_NOT_FOUND[preferL],
                        errorCodes.NOT_FOUND, customErrorCodes.NOT_FOUND);
                }
            }

            next();
        } catch (e) {
            res.status(errorCodes.NOT_FOUND).json(e.message);
        }
    },
};
