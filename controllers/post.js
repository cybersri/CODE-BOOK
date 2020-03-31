const postModel = require('../models/Post.model');
const userModel = require('../models/User.model');
const jwt = require('jsonwebtoken')

exports.getPost = async (req, res, next) => {
    const id = req.params.id;
    try {
        const post = await postModel.findById({ id });
        if (!post) {
            return res.status(204).json({
                msg: 'no post found!'
            });
        }
        res.status(200).json({
            post
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Internal problem',
            err: err.message
        })
    }
}

exports.postPost = async (req, res, next) => {
    const { title, description, code } = req.body;
    console.log(req.user)
    try {
        const newPost = new postModel({
            title, description, code, user:req.user._id, organization:req.user.organization
        });
        await newPost.save();
        res.status(200).json({
            msg: 'post created successful',
            newPost
        })
    } catch (err) {
        res.status(500).json({
            msg: 'internal problem',
            err: err.message
        })
    }

}

exports.patchPost = (req, res, next) => {

}