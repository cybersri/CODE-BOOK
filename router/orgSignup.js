const router = require('express').Router();
const { getOrgSignup, postOrgSignup } = require('../controllers/OrgSignup');
const { validation } = require('../validations/signup');
const { orgSignUpVal } = require('../middleware/validate')

router.get('/org/signup', getOrgSignup);
router.post('/org/signup', orgSignUpVal, postOrgSignup);

module.exports = router;