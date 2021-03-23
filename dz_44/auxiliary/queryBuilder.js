module.exports = {
    userQueryBuilder: (queryParams) => {
        const filterObject = {};

        for (const key in queryParams) {
            switch (key) {
                case 'name':
                    filterObject.name = {$regex: queryParams.name, $options: 'i'};
                    break;
                case 'email':
                    filterObject.email = {$regex: queryParams.email, $options: 'i'};
                    break;
                default:
                    filterObject[key] = queryParams[key];
            }
        }

        return filterObject;
    },

    productQueryBuilder: (queryParams) => {
        const filterObject = {};

        for (const key in queryParams) {
            switch (key) {
                case 'name':
                    filterObject.name = {$regex: queryParams.name, $options: 'i'};
                    break;
                case 'priceGte':
                    filterObject.price = Object.assign({},
                        filterObject.price,
                        { $gte: +queryParams.priceGte });
                    break;
                case 'priceLte':
                    filterObject.price = Object.assign({},
                        filterObject.price,
                        { $lte: +queryParams.priceLte });
                    break;
                default:
                    filterObject[key] = queryParams[key];
            }
        }

        return filterObject;
    },
};
