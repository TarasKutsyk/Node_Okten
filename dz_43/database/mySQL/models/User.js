const {DataTypes, Model} = require('sequelize');
const {SQL_USERS_TABLE} = require('../../../config');
const {sequelize} = require('../index');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            defaultValue: 18
        }
    },
    {
        sequelize,
        tableName: SQL_USERS_TABLE,
        timestamps: false
    }
);

module.exports = User;
