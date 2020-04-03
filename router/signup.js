const express = require('express');
const Router = express.Router();
// const { validation } = require('../validations/signup');
const { getSignup, postSignup } = require('../controllers/signup');
const {signUpVal} = require('../middleware/Validator/Signup')

Router.get('/signup', getSignup)
Router.post('/signup', signUpVal, postSignup)

module.exports = Router;