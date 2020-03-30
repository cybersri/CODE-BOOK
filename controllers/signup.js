exports.getSignup = (req, res, next) => {
    res.status(200).json({
        msg: 'hello world'
    });
}

exports.postSignup = async (req, res, next) => {
    res.status(200).json({
        msg: 'hello',
        accessToken
    })
}