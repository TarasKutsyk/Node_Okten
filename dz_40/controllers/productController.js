const {errorCodes, errorMsg} = require('../constants/errors');
const {productService, fileUploadService} = require('../services');

const successMsg = require('../constants/successMessages');

module.exports = {
    addNewProduct: async (req, res) => {
        const {body: {name, price}, photos, docs} = req;

        try {
            const newProduct = await productService.addNewProduct({name, price});

            const docsUploadPaths = await fileUploadService.uploadFiles(
                docs,
                'product',
                newProduct._id,
                'doc'
            );
            await productService.updateProductById(newProduct._id, { docs: docsUploadPaths });

            const photosUploadPaths = await fileUploadService.uploadFiles(
                photos,
                'product',
                newProduct._id,
                'photo'
            );
            await productService.updateProductById(newProduct._id, { docs: photosUploadPaths });

            res.json(successMsg.PRODUCT_ADDED);
        } catch (e) {
            res.status(errorCodes.DATABASE_ERROR).json(`${errorMsg.DATABASE_WRITE_ERROR}: ${e.message}`);
        }
    },
};
