const Express = require('express');
const order_controller = require('../controller/order');
const authenticate_middleware = require('../middleware/auth');

const router = Express.Router();

router.get('/get_order', authenticate_middleware.authenticate, order_controller.purchasepremium);
router.post('/post_order', authenticate_middleware.authenticate, order_controller.updatepremium);

module.exports = router;