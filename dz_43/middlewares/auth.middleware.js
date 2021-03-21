const JWT = require('jsonwebtoken');

const authService = require('../services/authService');
const errorMsg = require('../constants/errors/errorMessages');
const errorCodes = require('../constants/errors/errorCodes');
const headerConstants = require('../constants/headers');
const userService = require('../services/mySQL_userService');

const {passwordHasher} = require('../auxiliary');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        const {preferL = 'en'} = req.body;

        try {
            const token = req.get(headerConstants.Authorization);

            if (!token) {
                throw new Error(errorMsg.BAD_TOKEN[preferL]);
            }

            JWT.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, err => {
                if (err) {
                    throw new Error(errorMsg.BAD_TOKEN[preferL]);
                }
            });

            const tokenEntry = await authService.getTokenEntry(token).populate('user');

            if (!tokenEntry) {
                throw new Error(errorMsg.BAD_TOKEN[preferL]);
            }

            req.user = tokenEntry.user;

            next();
        } catch (e) {
            res.status(errorCodes.UNAUTHORIZED).json(e.message);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        const {preferL = 'en'} = req.body;

        try {
            const token = req.get(headerConstants.Authorization);

            if (!token) {
                throw new Error(errorMsg.BAD_TOKEN[preferL]);
            }

            JWT.verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY, err => {
                if (err) {
                    throw new Error(errorMsg.BAD_REFRESH_TOKEN[preferL]);
                }
            });

            const tokenEntry = await authService.getRefreshTokenEntry(token);

            if (!tokenEntry) {
                throw new Error(errorMsg.BAD_REFRESH_TOKEN[preferL]);
            }

            req.refresh_token = tokenEntry.refresh_token;

            next();
        } catch (e) {
            res.status(errorCodes.UNAUTHORIZED).json(e.message || errorMsg.BAD_REFRESH_TOKEN[preferL]);
        }
    },

    deleteOldTokens: async (req, res, next) => {
        const {refresh_token} = req;

        try {
            const {user} = await authService.getRefreshTokenEntry(refresh_token);

            await authService.deleteEntryByUserId(user);

            req.user = user;

            next();
        } catch (e) {
            res.status(errorCodes.UNAUTHORIZED).json(e.message);
        }
    },

    isUserValid: async (req, res, next) => {
        const {email, password} = req.body;

        try {
            const user = await userService.getUserByEmail(email);

            if (!user) {
                throw new Error(errorMsg.BAD_LOGIN);
            }

            await passwordHasher.compare(password, user.password);

            req.user = user;

            next();
        } catch (e) {
            res.status(errorCodes.UNAUTHORIZED).json(e.message);
        }
    }
};
