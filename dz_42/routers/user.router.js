const router = require('express').Router();

const userController = require('../controllers/mySQL-user.controller');
const userMiddleware = require('../middlewares/mySQL-user.middleware');

router.post('/', userController.createUser);
router.get('/', userMiddleware.buildQueryParams, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
