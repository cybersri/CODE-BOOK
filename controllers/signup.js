const bcrypt = require('bcrypt');
const config = require('config');
const userModel = require('../models/User.model');
const { validationResult } = require('express-validator');
const organizationModel = require('../models/Organization.model')

exports.getSignup = (req, res, next) => {
    res.status(200).json({
        msg: 'hello world'
    });
}

exports.postSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors
        });
    }
    const { name, email, phone, address, password, organization } = req.body;
    try {
        console.log(organization)
        if(!organization){
            return res.status(403).json({
                msg:'invalid organization'
            })
        }
        const org = await organizationModel.findOne({name:organization});
        // if(!org){
        //     return res.status(403).json({
        //         msg:'invalid organization'
        //     })
        // }
        const salt = await bcrypt.genSalt(config.get('SALT'));
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name, email, phone, address, password: hashedPassword, organization:org
        });
        await newUser.save();
        return res.status(201).json({
            msg: 'User created'
        })
    } catch (err) {
        return res.status(500).json({
            msg: 'Internal server problem',
            err: err.message
        })
    }
}