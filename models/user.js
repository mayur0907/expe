const sequelize = require("../database/mysql");
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    contact: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    totalExpense: Sequelize.INTEGER,

    ispremiumuser: Sequelize.BOOLEAN,
});
module.exports = User;