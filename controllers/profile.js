const userModel = require('../models/User.model');
const jwt = require('jsonwebtoken');

exports.getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        res.status(200).json({
            msg: 'success',
            user
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Internal server problem',
            err: err.messsage
        })
    }
}

exports.patchProfile = async (req, res) => {
    let toUpdate = {};
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    toUpdate = name ? { ...toUpdate, name } : toUpdate;
    toUpdate = phone ? { ...toUpdate, phone } : toUpdate;
    toUpdate = address ? { ...toUpdate, address } : toUpdate;
    console.log(toUpdate);
    try {
        const user = await userModel.findByIdAndUpdate(req.user.id, {
            ...toUpdate,
            updatedOn: new Date()
        });
        console.log({ user });
        res.status(200).json({
            msg: 'success',
            user
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Internal server problem',
            err: err.messsage
        })
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.user.id, {
            status: 3
        });
        return res.status(201).json({
            msg: 'Account deactivated'
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Internal server problem',
            err: err.messsage
        })
    }
}