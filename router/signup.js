const express = require('express');
const Router = express.Router();

const { getSignup, postSignup } = require('../controllers/signup');

Router.get('/signup', getSignup)
Router.post('/signup', postSignup)

module.exports = Router;