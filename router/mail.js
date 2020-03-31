const router = require('express').Router();
const { getLogin, postLogin } = require('../controllers/login');

router.get('/org/verifymail/:token', (req,res)=>{
    console.log(req.params)
})

module.exports = router;