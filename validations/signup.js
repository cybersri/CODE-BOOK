const { check } = require('express-validator');

exports.validation = [
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
    .exists()
    .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character')   
    .isLength({ min: 8 })
    .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character')
];