const router = require('express').Router();

router.get('/verifymail/:token', (req, res) => {
    res.json(req.params)
})

module.exports = router;