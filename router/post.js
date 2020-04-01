const router = require('express').Router();
const { getPost, postPost, patchPost, deletePost } = require('../controllers/post');
const { postComment } = require('../controllers/comment')

router.get('/post/:id', getPost);
router.post('/post', postPost);
router.patch('/post', patchPost);
router.delete('/post', deletePost);


module.exports = router;