const {Op} = require('sequelize');

module.exports = (queryParams) => {
    const filterObject = {};

    for (const key in queryParams) {
        switch (key) {
            case 'name':
                filterObject.name = {[Op.like]: `%${queryParams.name}%`};
                break;
            case 'email':
                filterObject.email = {[Op.like]: `%${queryParams.email}%`};
                break;
            case 'id':
                if (Number(queryParams.id)) {
                    filterObject.id = queryParams.id;
                } else {
                    const idsArr = queryParams.id.split(';');
                    filterObject.id = {[Op.in]: idsArr};
                }
                break;
            default:
                filterObject[key] = queryParams[key];
        }
    }

    return filterObject;
};
