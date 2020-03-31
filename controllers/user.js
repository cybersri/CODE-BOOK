const postModel = require('../models/Post.model');
const userModel = require('../models/User.model');

exports.getUserPost = async (req, res) => {
    const email = req.params.email;
    try {
        const user = await userModel.findOne({ email });
        const posts = await postModel.find({ userID: user._id });
        res.status(202).json({
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            posts
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Internal problem',
            err: err.message
        });
    }
}