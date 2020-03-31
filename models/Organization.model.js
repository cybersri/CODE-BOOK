const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
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
    },
    status: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('organization', OrganizationSchema);