const route = require('express').Router();
const { getUserPost } = require('../controllers/user');

route.get('/user/post/:email', getUserPost);

module.exports = route;