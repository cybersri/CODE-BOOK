const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40
    },
    code: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 100000
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 255
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    updatedOn: {
        type: Date,
        default: new Date()
    },
    likes: {
        type: Number,
        default: 0
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports = mongoose.model('post', postSchema);
