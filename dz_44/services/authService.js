const Auth = require('../database/models/Auth');

module.exports = {
    createToken: (tokenObj) => Auth.create(tokenObj),

    getTokenEntry: (token) => Auth.findOne({access_token: token}),

    getRefreshTokenEntry: (token) => Auth.findOne({refresh_token: token}),

    deleteEntryByUserId: (userId) => Auth.deleteOne({user: userId}, err => {
        if (err) console.log(err);
    }),

    deleteEntriesByDate: async (date) => {
        const userTokensToDelete = [];
        const allTokens = await Auth.find();

        for (const token of allTokens) {
            if (token.updatedAt < date) {
                userTokensToDelete.push(token.user);
            }
        }

        return Auth.deleteMany({user: {$in: userTokensToDelete}}, err => {
            if (err) console.log(err);
        });
    }
};
