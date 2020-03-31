const router = require('express').Router();
const { getComments, postComment, patchComment, deleteComment } = require('../controllers/comment')


router.get('/comment/:id', getComments);
router.post('/comment', postComment);
router.patch('/comment', patchComment);
router.delete('/comment/:id', deleteComment);

module.exports = router;