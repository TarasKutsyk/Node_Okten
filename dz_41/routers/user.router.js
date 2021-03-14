const router = require('express').Router();

const userController = require('../controllers/user.controller');

const { userMiddleware, authMiddleware, fileMiddleware } = require('../middlewares');

router.get('/', userMiddleware.buildResponseInfo,
    userMiddleware.buildQueryParams,
    userMiddleware.areParamsValid,
    userController.getUsers);

router.get('/:userId', authMiddleware.checkAccessToken,
    userMiddleware.isUserIdValid,
    userController.getUserById);

router.post('/', 
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userMiddleware.isUserValid,
    userMiddleware.doesUserExist, 
    userController.addNewUser);

router.delete('/:userId',
    authMiddleware.checkAccessToken,
    userMiddleware.isUserIdValid,
    userController.deleteUser);

module.exports = router;
