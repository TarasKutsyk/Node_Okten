const {Schema, model} = require('mongoose');

const {PRODUCT} = require('../../constants/databaseTables');

const productsScheme = new Schema({
    name: {type: String},
    price: {type: Number},
});

module.exports = model(PRODUCT, productsScheme);
