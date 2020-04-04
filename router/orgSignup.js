const router = require('express').Router();
const { getOrgSignup, postOrgSignup } = require('../controllers/OrgSignup');
const { orgSignUpVal } = require('../middleware/Validator/Signup')

router.get('/org/signup', getOrgSignup);
router.post('/org/signup', orgSignUpVal, postOrgSignup);

module.exports = router;