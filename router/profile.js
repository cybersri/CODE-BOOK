const router = require('express').Router();
const { getProfile, patchProfile, deleteProfile } = require('../controllers/profile');
router.get('/profile', getProfile);
router.patch('/profile', patchProfile);
router.delete('/profile', deleteProfile);

module.exports = router;

