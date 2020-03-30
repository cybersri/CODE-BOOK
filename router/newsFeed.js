const route = require('express').Router();
const { getNewsFeed } = require('../controllers/newsFeed');
route.get('/google-news/:search', getNewsFeed);

module.exports = route;
