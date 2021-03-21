const User = require('../database/mySQL/models/User');

module.exports = {
    createUser: (filters, transaction) => User.create(filters, {transaction}),

    findAllUsers: (filters) => User.findAll({
        where: filters
    }),

    findUserById: (id) => User.findAll({
        where: {id}
    }),

    deleteUserById: (id) => User.destroy({
        where: {id}
    }),
};
