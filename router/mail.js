const router = require('express').Router();
const { verifyEmail }=require('../controllers/mailVerification')
const { passwordResetMail, recoverAccount, getCaptcha } = require('../controllers/recovery')
const { CaptchaValidator } = require('../middleware/Captcha');

router.get('/verifymail/:token',verifyEmail);
router.post('/reset_password', CaptchaValidator, passwordResetMail)
router.get('/recovery/:token', recoverAccount)
router.get('/captcha', getCaptcha)

module.exports = router;