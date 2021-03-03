const {Schema, model} = require('mongoose');

const productsScheme = new Schema({
    name: {type: String},
    price: {type: Number},
});

module.exports = model('Product', productsScheme);
