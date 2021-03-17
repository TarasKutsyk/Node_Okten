const {Schema, model} = require('mongoose');

const {PRODUCT} = require('../../constants/databaseTables');

const productsScheme = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    photos: [{type: String}],
    docs: [{type: String}],
});

module.exports = model(PRODUCT, productsScheme);
