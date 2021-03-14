const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.isUserValid, authController.generateNewTokensForUser);
router.get('/refresh', authMiddleware.checkRefreshToken, authMiddleware.deleteOldTokens,
    authController.generateNewTokensForUser);

module.exports = router;
