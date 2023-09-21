const login_controller = require('../controller/login');
const Express = require('express');

const router = Express.Router();

router.post('/login', login_controller.login);

module.exports = router;