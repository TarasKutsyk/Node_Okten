const {Schema, model} = require('mongoose');

const {AUTH, USER} = require('../../constants/databaseTables');

const authScheme = new Schema({
    access_token: {type: String},
    refresh_token: {type: String},
    user: {type: Schema.Types.ObjectId, ref: USER}
}, {timestamps: true});

module.exports = model(AUTH, authScheme);
