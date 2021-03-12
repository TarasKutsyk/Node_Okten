const mongoose = require('mongoose');
const User = require('../database/models/User');

require('../database/models/Product');

module.exports = {
    getAllUsers: (queryFilter) => User.find(queryFilter),

    getUserById: (id) => User.findById(id),

    getUserByEmail: (email) => User.findOne({email}),

    addNewUser: (user) => User.create(user),

    updateUserById: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject }),

    deleteUser: (id) => User.findByIdAndDelete(id, (err) => {
        if (err) console.log(err);
    }),

    doesUserExist: (properties) => User.exists(properties),

    checkIfUserExistsByEmail: (email) => User.exists({email}),

    isIdValid: (id) => mongoose.Types.ObjectId.isValid(id)
};
