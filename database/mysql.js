const Sequelize = require("sequelize");

// Replace these with your actual database credentials
const sequelize = new Sequelize("expense", "root", "mayur@123", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;
