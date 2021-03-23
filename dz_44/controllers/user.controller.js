const { errorCodes, errorMsg } = require('../constants/errors');
const {userService, mailService, fileUploadService} = require('../services');

const emailActions = require('../constants/emailActions');
const successMsg = require('../constants/successMessages');
const passwordHasher = require('../auxiliary/passwordHasher');

module.exports = {
    getUsers: async (req, res) => {
        const {responseInfo, query: queryParams} = req;

        try {
            const users = await userService.getAllUsers(queryParams, responseInfo);
            const count = await userService.countUsers(queryParams);

            res.json({
                data: users,
                page: responseInfo.page,
                limit: responseInfo.limit,
                count: responseInfo.count,
                pages: Math.ceil(count / responseInfo.limit)
            });
        } catch (e) {
            res.status(errorCodes.DATABASE_ERROR).json(`${errorMsg.DATABASE_READ_ERROR}: ${e.message}`);
        }
    },

    getUserById: async (req, res) => {
        const {userId} = req.params;

        try {
            const user = await userService.getUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.NOT_FOUND).json(e.message);
        }
    },

    addNewUser: async (req, res) => {
        const {body: {password, email, name}, avatar, docs} = req;

        try {
            const hashPassword = await passwordHasher.hash(password);

            const newUser = await userService.addNewUser({...req.body, password: hashPassword});

            const avatarUploadPath = await fileUploadService.uploadFile(
                avatar,
                'user',
                newUser._id,
                'photo'
            );
            await userService.updateUserById(newUser._id, { avatar: avatarUploadPath });

            const docsUploadPaths = await fileUploadService.uploadFiles(
                docs,
                'user',
                newUser._id,
                'doc'
            );

            await userService.updateUserById(newUser._id, { docs: docsUploadPaths });

            await mailService.sendMail(email, emailActions.WELCOME, {userName: name});

            res.json(successMsg.USER_ADDED);
        } catch (e) {
            res.status(errorCodes.DATABASE_ERROR).json(`${errorMsg.DATABASE_WRITE_ERROR}: ${e.message}`);
        }
    },

    deleteUser: async (req, res) => {
        const {userId} = req.params;
        const {preferL = 'en'} = req.body;

        try {
            if (userId !== req.user.id) {
                throw new Error(errorMsg.BAD_TOKEN[preferL]);
            }

            const user = await userService.getUserById(userId);
            await mailService.sendMail(user.email, emailActions.GOODBYE, {userName: user.name});

            userService.deleteUser(userId);

            res.json(successMsg.USER_DELETED);
        } catch (e) {
            res.status(errorCodes.UNAUTHORIZED).json(e.message);
        }
    }
};
