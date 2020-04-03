const router = require('express').Router();
const { getLogin, postLogin } = require('../controllers/login');
const { loginVal } = require('../middleware/Validator/Login')

router.get('/login', getLogin);
router.post('/login',loginVal ,postLogin);

module.exports = router;