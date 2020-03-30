const router = require('express').Router();
const { getOrgSignup, postOrgSignup } = require('../controllers/OrgSignup');
const { validation } = require('../validations/signup');

router.get('/org/signup', getOrgSignup);
router.post('/org/signup', validation, postOrgSignup);

module.exports = router;