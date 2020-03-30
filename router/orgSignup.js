const router = require('express').Router();
const { getOrgSignup, postOrgSignup } = require('../controllers/OrgSignup');

router.get('/org/signup', getOrgSignup);
router.post('/org/signup', postOrgSignup);

module.exports = router;