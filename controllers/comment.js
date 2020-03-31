const commentModel = require('../models/Comment.model');
const postModel = require('../models/Post.model');


exports.getComments = async(req, res, next)=>{
    try {
        const postId = req.params.id
        const post = await postModel.findOne({ _id:postId, organization:req.user.organization });
        if (!post) {
            return res.status(204).json({
                msg: 'no post found!'
            });
        }
        const comments = await commentModel.find({post:postId})
        res.status(200).json({
            comments
        });

        // get suggestions code goes here

    } catch (err) {
        res.status(500).json({
            msg: 'Internal problem',
            err: err.message
        })
    }
}

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

exports.patchComment = async(req, res, next) => {
    const id = req.body.id;
    const value = req.body.comment;
    try {
        const comment = await commentModel.findOneAndUpdate({_id:id, user:req.user.id},{
            comment:value,
            updatedOn: new Date()
        });
        if(!comment){
            return res.status(403).json({
                msg:"cannot update comment"
            })
        }

        res.status(202).json({
            msg: 'updated successfully',
            comment
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Internal problem',
            err: err.message
        })
    }
}

exports.deleteComment = async(req, res, next)=>{
    try{
        const id = req.params.id
        const comment = await commentModel.findOneAndDelete({
            _id:id, 
            user:req.user.id});
        if(!comment){
            return res.status(403).json({
                msg:"cannot delete comment"
            })
        }
        return res.status(202).json({
            msg:"comment deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            msg:"something went wrong"
        })
    }
}