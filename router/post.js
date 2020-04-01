const router = require('express').Router();
const { getPost, postPost, patchPost, deletePost } = require('../controllers/post');

router.get('/post/:id', getPost);
router.post('/post', postPost);
router.patch('/post', patchPost);
router.delete('/post/:id', deletePost);


module.exports = router;