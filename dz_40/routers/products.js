const router = require('express').Router();

const { fileMiddleware } = require('../middlewares');
const productController = require('../controllers/productController');

router.post('/',
    fileMiddleware.checkFiles,
    fileMiddleware.checkProductsFiles,
    productController.addNewUser);

module.exports = router;
