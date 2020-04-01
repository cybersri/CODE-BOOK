const mongoose = require('mongoose');
const config = require('config');

exports.MongoDB_Connection = async () => {
    try {
        await mongoose.connect(config.get('CONNECTION_URL'), { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
        console.log('Database connected.');
    } catch (err) {
        console.log(err.message)
        console.log('Failed in connecting with database');
    }
};