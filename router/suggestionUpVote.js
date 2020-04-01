const router = require('express').Router();
const { getUpVotes, postUpvotes } = require('../controllers/suggestionUpVote');

router.get('/suggestion/upvote/:id', getUpVotes);
router.post('/suggestion/upvote', postUpvotes);

module.exports = router;