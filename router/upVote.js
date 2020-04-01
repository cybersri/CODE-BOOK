const router = require('express').Router();
const { getUpVote, postUpVote } = require('../controllers/upVote');

router.get('/upVote/:id', getUpVote);
router.post('/upVote', postUpVote);

module.exports = router;