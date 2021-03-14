const Product = require('../database/models/Product');

module.exports = {
    getAllProducts: (queryFilter, {limit, sort, offset}) => Product.find(queryFilter).limit(+limit).skip(offset).sort(sort),

    countProducts: (filterObject) => Product.countDocuments(filterObject),

    addNewProduct: (product) => Product.create(product),

    updateProductById: (productId, updateObject) => Product.updateOne({ _id: productId }, { $set: updateObject }),

    doesProductExist: (properties) => Product.exists(properties),
};
