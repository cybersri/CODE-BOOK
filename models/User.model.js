const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: JSON,
        required: true
    },
    password: {
        type: String,
        minlength: 7,
        required: true,
        select:false
    },
    createdon: {
        type: Date,
        default: new Date()
    },
    updatedon: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Number,
        default: 0
    },
    organization:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'organization',
        required:true
    }
});

module.exports = mongoose.model('user', userSchema);