const router = require('express').Router();
const { getPost, postPost, patchPost, deletePost } = require('../controllers/post');
const { postVal } = require('../middleware/Validator/Post')

router.get('/post/:id', getPost);
router.post('/post', postVal, postPost);
router.patch('/post', postVal, patchPost);
router.delete('/post/:id', deletePost);


module.exports = router;