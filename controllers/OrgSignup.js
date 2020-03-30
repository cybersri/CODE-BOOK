const OrganizationModel = require('../models/Organization.model');
const bcrypt = require('bcrypt');
const config = require('config');
const { validationResult } = require('express-validator')
const { sendVerificationEmail } = require('../service/mail/verificationEmail/sendVerificationEmail')

exports.getOrgSignup = (req, res, next) => {   
    res.status(200).json({
        msg: 'organization route'
    })
}

exports.postOrgSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(422).json({
            errors
        });
    }
    const { name, email, address, phone, password } = req.body;
    console.log(name, email)
    req.body.status = 0
    try {
        const salt = await bcrypt.genSalt(config.get('SALT'));
        const hasedPassword = await bcrypt.hash(password, salt);
        const newOrganization = new OrganizationModel({
            name, email, phone, address, password: hasedPassword
        });
        await newOrganization.save();
        res.status(201).json({
            msg: 'Organization created'
        });

    } catch (err) {
        res.status(500).json({
            msg: 'Internal server problem',
            err: err.message
        });
    }  
}