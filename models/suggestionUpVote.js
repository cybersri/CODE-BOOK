const mongoose = require('mongoose');


const suggestionSchema = new mongoose.Schema({
    suggestionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'suggestion'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('suggestionlike', suggestionSchema);