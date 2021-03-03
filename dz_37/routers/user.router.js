const router = require('express').Router();
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userMiddleware.areParamsValid, userController.getUsers);
router.get('/:userId', userMiddleware.isUserIdValid, userController.getUserById);

router.post('/', userMiddleware.isUserValid, userMiddleware.doesUserExist, userController.addNewUser);

router.delete('/:userId', userMiddleware.isUserIdValid, userController.deleteUser);

module.exports = router;
