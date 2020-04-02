const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const config = require('config');
const secret = config.get('SECRET')
const svgCaptcha = require('svg-captcha');
const OrganizationModel = require('../models/Organization.model');
const UserModel = require('../models/User.model');
const { sendPasswordResetMail } = require('../services/mail/recovery/sendPasswordResetMail')
const { passwordGen } = require('../services/passwordGen')
const sha256 = require('sha256');

exports.passwordResetMail = async(req, res) =>{
    try{
        const { email, isOrg } = req.body;
        const curUser = isOrg ? await OrganizationModel.findOne({ email }).select('+password') : await UserModel.findOne({ email }).select('+password')

        if(curUser){
            await sendPasswordResetMail(curUser, isOrg);
        }
        return res.status(200).json({
            msg:'email sent'
        })
    }
    catch(err){
        return res.status(401).json({
            msg:'something went wrong',
            err
        })
    }
}

exports.recoverAccount = async(req,res,next)=>{
    try{
        const token = req.params.token;
        // password reset logic will replace the bellow code
        const decoded = jwt.decode(token);
        const email = decoded.email
        const isOrg = decoded.isOrg
        const action = decoded.action
        if(action==='reset password'){
            const curUser = isOrg ? await OrganizationModel.findOne({ email, status:1 }).select('+password') : await UserModel.findOne({ email, status:1 }).select('+password')
            if(!curUser){
                return res.status(401).json({
                    msg:'cannot change password'
                })
            }
            console.log(curUser.password)
            const verified = await jwt.verify(token, secret+curUser.password);
            const pass = passwordGen(16)
            const salt = await bcrypt.genSalt(config.get('SALT'));
            const hashedPassword = await bcrypt.hash(pass, salt);
            if (isOrg){
                await OrganizationModel.findByIdAndUpdate(curUser._id,{password:hashedPassword})
            }
            else{
                await UserModel.findByIdAndUpdate(curUser._id, {password:hashedPassword})
            }
            return res.status(200).json({
                email,
                password:pass,
                msg:'copy this credentials and save in your password manager or login using this credential to change passsword to whatever you want'
            })
            

        }
        else{
            return res.status(401).json({
                msg:"out of scope"
            })
            }
        }
        catch(err){
            return res.status(401).json({
                msg:"link expired or unable to reset password"
            })
        }
}

exports.getCaptcha = (req, res) => {

    try {
        const captcha = svgCaptcha.create({
            size: 6,
            noise: 3
        });
        const { data, text } = captcha;
        const hashedText = sha256(text);
        console.log(text);
        const token = jwt.sign({
            captcha: hashedText
        }, secret, {
            expiresIn: '15m'
        });
        res.status(200).json({
            token,
            svg: data
        });
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }  
}

