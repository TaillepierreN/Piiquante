// 2 routes
const {Router} = require('express');
const { login, signup } = require('../controllers/authController');
const authParams = require('../middlewares/authParams');
const router = Router();

router.post('/login',  authParams, login)

router.post('/signup', authParams, signup)

module.exports = router;