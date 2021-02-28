const User = require('../database/models/User');
require('../database/models/Product');

const userIdLength = 24;

module.exports = {
    getAllUsers: () => User.find(),

    getUserById: (id) => User.findById(id),

    addNewUser: (user) => User.create(user),

    deleteUser: (id) => User.findByIdAndDelete(id, (err) => {
        if (err) console.log(err);
    }),
    // deleteUser: (id) => User.deleteOne({ _id: id }, (err) => {
    //     if (err) console.log(err);
    // }),
    doesUserExist: async (properties) => {
        const users = await User.find();

        for (const key in properties) {
            if (users.some(user => user[key] === properties[key])) {
                return true;
            }
        }

        return false;
    },

    doesMatchQueryParams: (user, queryParams) => {
        for (const key in queryParams) {
            if (queryParams[key] === user[key]) {
                return true;
            }
        }

        return false;
    },

    isIdValid: (id) => id.length === userIdLength,
};
