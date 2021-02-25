const fse = require('fs-extra');
const path = require('path');

const usersPath = path.join(process.cwd(), 'database', 'users.json');

module.exports = {
    getAllUsers: () => fse.readJson(usersPath),

    addNewUser: async (user) => {
        const users = await fse.readJson(usersPath);
        users.push(user);

        fse.writeJson(usersPath, users);
    },

    doesUserExist: async (properties) => {
        const users = await fse.readJson(usersPath);

        for (const key in properties) {
            if (users.some(user => user[key] === properties[key])) {
                return true;
            }
        }

        return false;
    },

    doesMatchQueryParams: (user, queryParams) => {
        for (const key in queryParams) {
            if (queryParams[key] === user[key]) {
                return true;
            }
        }

        return false;
    },

    isIdValid: async (id) => {
        const users = await fse.readJson(usersPath);

        return Number.isInteger(id) && !Number.isNaN(id) && id >= 0 && id < users.length;
    },

    deleteUser: async (id) => {
        const users = await fse.readJson(usersPath);
        users.splice(id, 1);

        fse.writeJson(usersPath, users);
    }
};
