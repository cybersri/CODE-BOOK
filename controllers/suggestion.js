const postModel = require('../models/Post.model');
const suggestionModel = require('../models/Suggestion.model')

exports.getSuggestions = async (req, res, next) => {
    try {
        const postId = req.params.id
        const post = await postModel.findOne({ _id: postId, organization: req.user.organization });
        if (!post) {
            return res.status(204).json({
                msg: 'no post found!'
            });
        }
        const suggestions = await suggestionModel.find({ post: postId })
        res.status(200).json({
            suggestions
        });

        // get suggestions code goes here

    } catch (err) {
        res.status(500).json({
            msg: 'Internal problem',
            err: err.message
        })
    }
}

exports.postSuggestion = async (req, res, next) => {
    try {
        const { postId, title, description, code } = req.body;
        console.log(req.user)
        const post = await postModel.findOne({ _id: postId, organization: req.user.organization });
        console.log({ post });
        if (!post) {
            return res.status(402).json({
                msg: 'cannot post suggestions'
            });
        }


        const newSuggestion = new suggestionModel({
            title, description, code, user: req.user._id, post: postId
        });
        await newSuggestion.save();
        res.status(200).json({
            msg: 'Suggestion posted successfully',
            newSuggestion
        })
    } catch (err) {
        res.status(500).json({
            msg: 'internal problem',
            err: err.message
        })
    }

}

exports.patchSuggestion = async (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const code = req.body.code;
    const description = req.body.description;
    let toUpdate = {};
    toUpdate = title ? { ...toUpdate, title } : toUpdate;
    toUpdate = code ? { ...toUpdate, code } : toUpdate;
    toUpdate = description ? { ...toUpdate, description } : toUpdate;
    try {
        const suggestion = await suggestionModel.findOneAndUpdate({ _id: id, user: req.user.id }, {
            ...toUpdate,
            updatedOn: new Date()
        });

        res.status(202).json({
            msg: 'updated successfully',
            suggestion
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Internal problem',
            err: err.message
        })
    }
}


exports.deleteSuggestion = async (req, res, next) => {
    try {
        const id = req.params.id
        const suggestion = await suggestionModel.findOneAndDelete({
            _id: id,
            user: req.user.id
        });
        console.log(suggestion)
        if (!suggestion) {
            return res.status(403).json({
                msg: "cannot delete suggestion"
            })
        }
        return res.status(202).json({
            msg: "suggestion deleted successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            msg: "something went wrong"
        })
    }
}