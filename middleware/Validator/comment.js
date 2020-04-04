const { validateText } = require('filter-paper')
exports.commentVal = (req, res, next) =>{
    try {
        let { comment } = req.body
        comment = validateText({
            value:comment,
            name:'comment',
            min:5,
            max:255
        })
        if(comment.isValid){
            req.body.comment = comment.data
            next()
        }
        else{
            return res.status(401).json({
                err:comment.err
            })
        }

        }
     catch (error) {
        return res.status(401).json({
            msg:'something went wrong',
            error
        })
    }
}