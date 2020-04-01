const router = require('express').Router();
const { verifyEmail }=require('../controllers/mailVerification')


router.get('/verifymail/:token',verifyEmail);

module.exports = router;