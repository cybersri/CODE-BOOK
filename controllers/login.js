const OrganizationModel = require('../models/Organization.model');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res, next) => {
    res.status(200).json({
        msg: 'login route'
    })
}

exports.postLogin = async (req, res, next) => {
    const { email, password, isOrg } = req.body;
    if(isOrg) {
        try {
            const curUser = await OrganizationModel.findOne({email});
            if(!curUser) {
                return res.status(402).json({
                    msg: 'Invalid cerdentials'
                });
            }
            const valid = await bcrypt.compare(password, curUser.password);
            if(valid) {
                return res.status(200).json({
                    msg: 'success'
                })
            }
            return res.status(402).json({
                msg: 'Invalid cerdentials'
            });
        } catch (err) {
            res.status(500).json({
                msg: err.message
            })
        }
    }else{

    }
}