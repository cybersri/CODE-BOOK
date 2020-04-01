const moongose = require('mongoose');

const UpVoteSchema = new moongose.Schema({
    postID: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    userID: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports = moongose.model('upvote', UpVoteSchema);