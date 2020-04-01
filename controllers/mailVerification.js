const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('SECRET')

const OrganizationModel = require('../models/Organization.model');
const UserModel = require('../models/User.model');

exports.verifyEmail = async(req,res,next)=>{
    try{
        const token = req.params.token;
        const verified = await jwt.verify(token,secret);
        const {email, isOrg, action} = verified
        if (action==="verify"){
            const curUser = isOrg ? await OrganizationModel.findOneAndUpdate({ email },{status:1}) : await UserModel.findOneAndUpdate({ email },{status:2});
            return res.status(200).json({
                msg:'mail verified'
            })
        }
        else{
            return res.status(402).json({
                msg:"out of scope"
            })
            }
        }
        catch(err){
            return res.status(402).json({
                msg:"link expired or unable to verify"
            })
        }
}