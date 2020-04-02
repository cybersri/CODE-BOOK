const route = require('express').Router();
const { getUserPost, pendingActivationRequest, setStatus, deleteUser } = require('../controllers/user');

route.get('/user/post/:email', getUserPost);
route.get('/org/pendingactivation', pendingActivationRequest);
route.patch('/org/user/status', setStatus);
route.delete('/org/user/:id', deleteUser );

module.exports = route;