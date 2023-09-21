const expense_model = require('../models/expense');

exports.get_expenses = async (req) => {
    return expense_model.findAll({ where: { userId: req.user.id } });
}