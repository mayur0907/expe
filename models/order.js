const sequelize = require("../database/mysql");
const Sequelize = require("sequelize");

const Order = sequelize.define("order", {
    id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    paymentid: Sequelize.STRING,
    orderid: Sequelize.STRING,
    status: Sequelize.STRING,
    userId: {
        type: Sequelize.INTEGER,
    },
});

module.exports = Order;