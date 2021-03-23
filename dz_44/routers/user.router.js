const router = require('express').Router();

const userController = require('../controllers/user.controller');

const { userMiddleware, authMiddleware, fileMiddleware } = require('../middlewares');

router.get('/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkUserRole(['admin']),
    userMiddleware.buildResponseInfo,
    userMiddleware.buildQueryParams,
    userMiddleware.areParamsValid,
    userController.getUsers);

router.get('/:userId',
    authMiddleware.checkAccessToken,
    authMiddleware.checkUserRole(['user', 'admin']),
    userMiddleware.isUserIdValid,
    userController.getUserById);

router.post('/',
    authMiddleware.checkUserRole(['user', 'admin']),
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userMiddleware.isUserValid,
    userMiddleware.doesUserExist, 
    userController.addNewUser);

router.delete('/:userId',
    authMiddleware.checkAccessToken,
    authMiddleware.checkUserRole(['user']),
    userMiddleware.isUserIdValid,
    userController.deleteUser);

module.exports = router;
