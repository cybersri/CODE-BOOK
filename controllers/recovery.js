const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const config = require('config');
const secret = config.get('SECRET')
const svgCaptcha = require('svg-captcha');
const OrganizationModel = require('../models/Organization.model');
const UserModel = require('../models/User.model');
const { sendPasswordResetMail } = require('../services/mail/recovery/sendPasswordResetMail')
const { sendDeleteAccountMail} = require('../services/mail/recovery/sendDeleteAccountMail')
const { passwordGen } = require('../services/passwordGen')
const sha256 = require('sha256');
const { deleteUser, deleteOrganization } = require('./delete')

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

exports.deleteAccountMail=async (req,res)=>{
    try {
        const curUser = req.isOrg ? await OrganizationModel.findById(req.user._id).select('+password') : await UserModel.findById(req.user._id).select('+password')
        await sendDeleteAccountMail(curUser, req.isOrg)
        return res.status(200).json({
            msg:'confirmation mail has been sent'
        })
    } catch (err) {
        return res.status(401).json({
            msg:'something went wrong',
            err
        })
    }
}

exports.recoverAccount = async(req,res,next)=>{
    try{
        const token = req.params.token;
        const decoded = jwt.decode(token);
        const email = decoded.email
        const isOrg = decoded.isOrg
        const action = decoded.action
        const curUser = isOrg ? await OrganizationModel.findOne({ email, status:1 }).select('+password') : await UserModel.findOne({ email, status:1 }).select('+password')
        if(!curUser){
            return res.status(401).json({
                msg:'no user found'
            })
        }
        const verified = await jwt.verify(token, secret+curUser.password);
        if(action==='reset password'){
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
        else if(action==='delete account'){
            console.log('delete acc')
            let del;
            if(isOrg){
                del = await deleteOrganization(curUser);
            }
            else{
                del = await deleteUser(curUser);
            }
            console.log(del)
            if(del.status){
                return res.status(200).json({
                    msg:'account deleted successfully',
                    user
                })
            }
            else{
                return res.status(401).json({
                    err:del.err
                })
            }
        }
        else{
            return res.status(401).json({
                msg:"out of scope"
            })
            }
        }
        catch(err){
            return res.status(401).json({
                msg:"invalid URL",
                err
            })
        }
}

// exports.deleteAccount=async(req, res)=>{
//     try {
//         const token = req.params.token;
//         const {email, isOrg, action} = jwt.decode(token);
//         if(action === 'delete account'){
//             const curUser = isOrg ? await OrganizationModel.findOneAndDelete({ email }) : await UserModel.findOneAndDelete({ email })
//             if(!curUser){
//                 return res.status(401).json({
//                     msg:'no account found'
//                 })
//             }
//             else{
//                 return res.status(200).json({
//                     msg:'account deleted successfully'
//                 })
//             }
//         }
//         else{
//             return res.status(401).json({
//                 msg:'out of scope'
//             })
//         }
//     } catch (err) {
//         return res.status(401).json({
//             msg:'something went wrong',
//             err
//         })
//     }
// }

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
            svg: encodeURI(data)
        });
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }  
}

