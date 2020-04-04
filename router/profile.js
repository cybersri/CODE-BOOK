const router = require('express').Router();
const multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const { getProfile, patchProfile, deleteProfile, updateProfile } = require('../controllers/profile');
router.get('/profile', getProfile);
router.patch('/profile', patchProfile);
router.delete('/profile', deleteProfile);
router.post('/profile/picture', upload.single('file'),updateProfile);

module.exports = router;

