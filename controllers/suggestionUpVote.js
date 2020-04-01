const suggestionUpVoteModel = require('../models/suggestionUpVote');
const suggestionModel = require('../models/Suggestion.model');

exports.getUpVotes = async (req, res) => {
    const suggestionID = req.params.id;
    const userID = req.user._id;
    try {
        const suggestionExist = await suggestionModel.findById(suggestionID);
        if (!suggestionExist) {
            return res.status(400).json({
                msg: 'no suggestion found'
            });
        }

        const suggestionLikes = await suggestionUpVoteModel.find({ suggestionID });
        res.status(200).json({
            msg: 'success',
            suggestionLikes
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Internal problem',
            err: err.messsage
        })
    }
}

exports.postUpvotes = async (req, res) => {
    const suggestionID = req.body.id;
    const userID = req.user._id;
    try {
        const suggestion = await suggestionModel.findById(suggestionID);
        let response;
        if (!suggestion) {
            return res.status(400).json({
                msg: 'no suggestion found'
            });
        }
        const existingLike = await suggestionUpVoteModel.findOneAndDelete({ suggestionID, userID });
        if (existingLike) {
            response = await suggestionModel.findOneAndUpdate({ _id: suggestionID, user: userID }, {
                $inc: {
                    likes: -1
                }
            });
        } else {
            response = await suggestionModel.findOneAndUpdate({ _id: suggestionID, user: userID }, {
                $inc: {
                    likes: 1
                }
            });
            const newUpVote = new suggestionUpVoteModel({
                suggestionID,
                userID
            });
            await newUpVote.save();
        }


        res.status(202).json({
            response
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Internal server probelm',
            err: err.message
        })
    }
}



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODRjODUwN2Q4ZmZhNzRlZjQxYzI0ZiIsImVtYWlsIjoic3Jpa2FudGgua0Bjb2RpbmdtYXJ0LmNvbSIsImlzT3JnIjpmYWxzZSwiaWF0IjoxNTg1NzYxMTM5LCJleHAiOjE1ODYzNjU5Mzl9.3t5wbzZDK9j4JY9_MsrytCOIg1SkR8U_O6QFBXXYxk8