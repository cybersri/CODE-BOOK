const bcrypt = require('bcrypt');
const config = require('config');
const userModel = require('../models/User.model');
const { validationResult } = require('express-validator');

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
    const { name, email, phone, address, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(config.get('SALT'));
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name, email, phone, address, password: hashedPassword
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