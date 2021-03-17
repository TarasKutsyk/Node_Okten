const {Sequelize} = require('sequelize');

module.exports = {
    sequelize: new Sequelize('sep-2020', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql'
    })
};
