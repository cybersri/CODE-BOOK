const svgCaptcha = require('svg-captcha');
var captcha = svgCaptcha.create({
    size: 6,
    noise: 3
});
console.log(captcha);