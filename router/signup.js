const express = require('express');
const Router = express.Router();
const { validation } = require('../validations/signup');
const { getSignup, postSignup } = require('../controllers/signup');

Router.get('/signup', getSignup)
Router.post('/signup', validation, postSignup)

module.exports = Router;