const router = require('express').Router();
const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const productsRouter = require('./products.router');

router.use('/users', userRouter);
router.use('/login', authRouter);
router.use('/products', productsRouter);

module.exports = router;
