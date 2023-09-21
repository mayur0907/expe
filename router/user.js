const Express = require('express');

const authentication = require('../middleware/auth');

const controller = require('../controller/user');

const router = Express.Router();

router.post('/User', controller.User);

router.get('/ispremiumuser', authentication.authenticate, controller.ispremiumuser);

module.exports = router;