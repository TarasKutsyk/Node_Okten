const userQueryBuilder = require('../auxiliary/mySQLqueryBuilder');

module.exports = {
    buildQueryParams: (req, res, next) => {
        // eslint-disable-next-line no-unused-vars
        const {limit = 20, page = 1, sortBy = 'name', order = 'asc', ...queryFilters} = req.query;

        req.query = userQueryBuilder(queryFilters);

        next();
    },
};
