const OrganizationModel = require('../models/Organization.model');
const UserModel = require('../models/User.model');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res, next) => {
    res.status(200).json({
        msg: 'login route'
    })
}

const Validator = async (model, email, password, res) => {
    try {
        const curUser = await model.findOne({email});
        if(!curUser) {
            return {code: 402};
        }
        const valid = await bcrypt.compare(password, curUser.password);
        if(valid) {
            return {code: 200};
        }
        return {code: 402};
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
    console.log(result);
    switch(result.code)
    {
        case 402:
            return res.status(402).json({
                msg: 'Invalid cerdentials'
            });
        case 200:
            return res.status(200).json({
                msg: 'success'
            })
        case 500:
            return res.status(500).json({
                msg: result.code
            });
        default:
            return res.status(400).json({
                msg: 'Bad request'
            })
    }
}