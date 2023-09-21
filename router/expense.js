const Express = require('express');
const expense_controller = require('../controller/expense');
const authenticate_middleware = require('../middleware/auth');
const router = Express.Router();

router.post('/expense', authenticate_middleware.authenticate, expense_controller.expense);
router.get('/get_expenses', authenticate_middleware.authenticate, expense_controller.get_expenses);
router.delete('/delete_expense/:id', authenticate_middleware.authenticate, expense_controller.delete_expense);
router.get('/download', authenticate_middleware.authenticate, expense_controller.download);

module.exports = router;