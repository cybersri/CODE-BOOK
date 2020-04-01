const router = require('express').Router();
const { getSuggestions, postSuggestion, patchSuggestion, deleteSuggestion } = require('../controllers/suggestion');


router.get('/suggestions/:id', getSuggestions);
router.post('/suggestions', postSuggestion);
router.patch('/suggestions', patchSuggestion);
router.delete('/suggestions/:id', deleteSuggestion )


module.exports = router;