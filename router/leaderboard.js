const Express = require('express');
const authentication = require('../middleware/auth');
const controller_leaderboard = require('../controller/leaderboard');

const router = Express.Router()

router.get('/leaderboard', authentication.authenticate, controller_leaderboard.leaderboard);

module.exports = router;