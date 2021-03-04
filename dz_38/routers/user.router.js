const router = require('express').Router();

const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userMiddleware.areParamsValid, userController.getUsers);
router.get('/:userId', authMiddleware.checkAccessToken, userMiddleware.isUserIdValid, userController.getUserById);

router.post('/', userMiddleware.isUserValid, userMiddleware.doesUserExist, userController.addNewUser);

router.delete('/:userId', authMiddleware.checkAccessToken, userMiddleware.isUserIdValid, userController.deleteUser);

module.exports = router;
