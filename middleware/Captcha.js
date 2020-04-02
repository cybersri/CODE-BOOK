const config = require('config');
const secret = config.get('SECRET');
const jwt = require('jsonwebtoken');
const sha256 = require('sha256');

exports.CaptchaValidator = async (req, res, next) => {
    try {
        const { text, token } = req.body;
        const { captcha } = await jwt.verify(token, secret);
        const hashedText = sha256(text);
        if(captcha === hashedText) {
            return next();
        }
        res.status(400).json({
            msg: 'wrong captcha entered'
        })
    } catch (err) {
        res.status(500).json({
            msg: 'internal problem',
            err: err.message
        })
    }

}