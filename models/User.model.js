const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 7,
        required: true
    },
    createdon: {
        type: Date,
        default: new Date()
    },
    updatedon: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('user', userSchema);