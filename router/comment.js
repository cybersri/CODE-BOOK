const router = require('express').Router();
const { getComments, postComment, patchComment, deleteComment } = require('../controllers/comment')
const { commentVal } = require('../middleware/Validator/comment')

router.get('/comment/:id', getComments);
router.post('/comment', commentVal, postComment);
router.patch('/comment', commentVal, patchComment);
router.delete('/comment/:id', deleteComment);

module.exports = router;