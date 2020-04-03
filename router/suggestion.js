const router = require('express').Router();
const { getSuggestions, postSuggestion, patchSuggestion, deleteSuggestion } = require('../controllers/suggestion');
const { suggestionVal } = require('../middleware/Validator/suggestion')

router.get('/suggestions/:id', getSuggestions);
router.post('/suggestions', suggestionVal, postSuggestion);
router.patch('/suggestions', suggestionVal, patchSuggestion);
router.delete('/suggestions/:id', deleteSuggestion )


module.exports = router;