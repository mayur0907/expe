const sequelize = require("../database/mysql");
const Expense = require("../models/expense");
const User = require("../models/user");
const { expense } = require("./expense");

exports.leaderboard = async (req, res, next) => {
    try {
        const users_leaderboard = await User.findAll({
            order: [['totalExpense', 'DESC']],
            attributes: ["id", "name", "totalExpense"],
        });
        res.status(200).json(users_leaderboard);
    } catch (err) {
        res.status(500).json(err);
    }
};