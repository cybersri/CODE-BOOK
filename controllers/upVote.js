const postModel = require('../models/Post.model');
const UpVoteModel = require('../models/UpVote');

exports.getUpVote = async (req, res) => {
    const { id } = req.body;
    try {
        const validUser = await postModel.findOne({ _id: id, user: req.user._id, organization: req.user.organization });
        if (!validUser) {
            res.status(400).json({
                msg: 'No post found'
            })
        } else {
            const liked = await UpVoteModel.find({ postID: id, userID: req.user.id });
            res.status(200).json({
                msg: 'success',
                liked
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: 'Internal server problem'
        });
    }
}

const updatePost = async (update, id, orgID, res) => {
    console.log({ update, id, orgID });
    const existingPost = await postModel.findOneAndUpdate({
        _id: id,
        organization: orgID
    }, {
        $inc: {
            likes: update
        }
    });
    if (!existingPost) {
        return res.status(244).json({
            msg: 'No post found'
        });
    }
    return existingPost;
}

exports.postUpVote = async (req, res) => {
    const { id } = req.body;
    console.log({ id })
    try {
        const existingLike = await UpVoteModel.findOneAndDelete({ postID: id, userID: req.user._id });
        let existingPost, msg;
        if (!existingLike) {
            existingPost = await updatePost(1, id, req.user.organization, res);
            const newUpvote = new UpVoteModel({
                postID: id,
                userID: req.user._id
            });
            console.log(await newUpvote.save());
            msg = 'Like added to post';
        } else {
            existingPost = await updatePost(-1, id, req.user.organization, res);
            msg = 'Like remove to post';
        }
        return res.status(200).json({
            msg,
            existingPost
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Internal server problem',
            err: err.message
        });
    }
}