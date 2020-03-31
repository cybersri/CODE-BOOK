const commentModel = require('../models/Comment.model');
const postModel = require('../models/Post.model');


exports.postComment = async (req, res, next) => {
    try {
        const { comment, postId } = req.body;
        console.log(req.user)
        const post = await postModel.findOne({_id:postId,organization:req.user.organization})
        if(!post){
            return res.status(403).json({
                msg:"cannot post comment"
            })
        }
        const newComment = new commentModel({
            comment, user:req.user._id, post: postId
        });
        await newComment.save();
        res.status(200).json({
            msg: 'comment posted successful',
            newComment
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