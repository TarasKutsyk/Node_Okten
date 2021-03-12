const {Schema, model} = require('mongoose');

const {PRODUCT} = require('../../constants/databaseTables');

const productsScheme = new Schema({
    name: {type: String},
    price: {type: Number},
    photo: {type: String},
    docs: {type: String},
});

module.exports = model(PRODUCT, productsScheme);
