const router = require('express').Router();
const { getPost, postPost, patchPost } = require('../controllers/post');


router.get('/post/:id', getPost);
router.post('/post', postPost);
router.patch('/post', patchPost);


module.exports = router;