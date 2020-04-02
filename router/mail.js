const router = require('express').Router();
const { verifyEmail }=require('../controllers/mailVerification')
const { passwordResetMail, recoverAccount } = require('../controllers/recovery')

router.get('/verifymail/:token',verifyEmail);
router.post('/reset_password', passwordResetMail)
router.get('/recovery/:token', recoverAccount)

module.exports = router;