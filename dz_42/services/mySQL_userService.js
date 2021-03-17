const User = require('../database/mySQL/models/User');

module.exports = {
    createUser: (studentObj) => User.create(studentObj),

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
