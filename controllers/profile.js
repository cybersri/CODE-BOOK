const userModel = require('../models/User.model');
var AWS = require("aws-sdk");

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

exports.updateProfile = (req, res) => {

    let s3bucket = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
  });
  var params = {
    Bucket: process.env.BUCKET,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };
  console.log(s3bucket, params);
  s3bucket.upload(params, function(err, data) {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
        console.log(data);
        res.status(200).json({
            msg: 'uploaded successful'
        })
    }
  });
};