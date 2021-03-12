const Product = require('../database/models/Product');

module.exports = {
    addNewProduct: (product) => Product.create(product),
    updateProductById: (productId, updateObject) => Product.updateOne({ _id: productId }, { $set: updateObject }),
};
