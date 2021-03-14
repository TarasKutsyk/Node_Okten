const Auth = require('../database/models/Auth');

module.exports = {
    createToken: (tokenObj) => Auth.create(tokenObj),

    getTokenEntry: (token) => Auth.findOne({access_token: token}),

    getRefreshTokenEntry: (token) => Auth.findOne({refresh_token: token}),

    deleteEntryByUserId: (userId) => Auth.deleteOne({user: userId}, err => {
        if (err) console.log(err);
    }),
};
