const router = require('express').Router();
const { check } = require('express-validator');
const { getOrgSignup, postOrgSignup } = require('../controllers/OrgSignup');

const Validator = [
    check('name')
        .not()
        .isEmpty()
        .trim()
        .escape(),
    check('email')
        .isEmail(),
    check('phone')
        .isNumeric()
        .isLength({min: 10, max: 10}),
    check('address')
        .not()
        .isEmpty()
        .trim()
        .escape(),
    check('password')
        .isAlphanumeric()
];

router.get('/org/signup', getOrgSignup);
router.post('/org/signup', postOrgSignup);

module.exports = router;