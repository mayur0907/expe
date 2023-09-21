const sequelize = require("../database/mysql");
const Sequelize = require("sequelize");

const Expense = sequelize.define("expense", {
    id: {
        type: Sequelize.INTEGER,
        allowNUll: false,
        autoIncrement: true,
        primaryKey: true,
    },
    expense: {
        type: Sequelize.INTEGER,
    },
    description: {
        type: Sequelize.STRING,
        allowNUll: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNUll: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNUll: false,
    },
});

module.exports = Expense;