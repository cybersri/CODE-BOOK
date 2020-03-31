const router = require('express').Router();
const { getLogin, postLogin } = require('../controllers/login');

router.get('/verifymail/:token', (req,res)=>{
    res.json(req.params)
})

module.exports = router;