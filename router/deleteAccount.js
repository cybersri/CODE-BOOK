const router = require('express').Router();
const { deleteAccountMail } = require('../controllers/recovery')


router.delete('/deleteAccount', deleteAccountMail);

module.exports = router;