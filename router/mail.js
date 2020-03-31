const router = require('express').Router();

router.get('/org/verifymail/:token', (req, res) => {
    console.log(req.params)
})

module.exports = router;