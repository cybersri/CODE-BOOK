const { validateText, simplify } = require('../../validations/validators')

exports.commentVal = (req, res, next) =>{
    try {
        let { comment } = req.body
        comment = validateText(comment, 5, 255 );
    
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