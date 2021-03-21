const router = require('express').Router();

const { fileMiddleware, userMiddleware, productMiddleware } = require('../middlewares');
const productController = require('../controllers/product.controller');

router.post('/',
    fileMiddleware.checkFiles,
    fileMiddleware.checkProductsFiles,
    productController.addNewProduct);

router.get('/', 
    userMiddleware.buildResponseInfo,
    productMiddleware.buildQueryParams,
    productMiddleware.areParamsValid,
    productController.getProducts);

module.exports = router;
