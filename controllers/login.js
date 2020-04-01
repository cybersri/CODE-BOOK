const OrganizationModel = require('../models/Organization.model');
const UserModel = require('../models/User.model');
const bcrypt = require('bcrypt');
const { getToken, user } = require('../middleware/Auth');

exports.getLogin = (req, res, next) => {
    res.status(200).json({
        msg: 'login route'
    })
}

const Validator = async (model, email, password, res) => {
    try {
        const curUser = await model.findOne({email}).select('+password');
        if(curUser.status===0){
            return {code:403,msg:'please verify your email'};
        }
        if(curUser.status===2){
            return {code:403,msg:'Waiting for your organization to accept your request'}
        }
        // console.log(curUser)
        if(!curUser) {
            return {code: 401};
        }
        const valid = await bcrypt.compare(password, curUser.password);
        if(valid) {
            return {code: 200, curUser};
        }
        return {code: 401};
    } catch (err) {
        return {code: 500, msg: err.message};
    }
}

exports.postLogin = async (req, res) => {
    const { email, password, isOrg } = req.body;
    let result = null;
    if(isOrg) {
        result = await Validator(OrganizationModel, email, password, res);
    }else{
        result = await Validator(UserModel, email, password, res);
    }
    switch(result.code)
    {
        case 401:
            return res.status(401).json({
                msg: 'Invalid cerdentials'
            });
        case 403:
            return res.status(403).json({
                msg: result.msg
            })
        case 200:
            const token = await getToken(result.curUser, isOrg ? true: false);
            console.log({token})
            return res.status(200).json({
                msg: 'success',
                token
            })
        case 500:
            return res.status(500).json({
                msg: result.msg
            });
        default:
            return res.status(400).json({
                msg: 'Bad request'
            })
    }
}