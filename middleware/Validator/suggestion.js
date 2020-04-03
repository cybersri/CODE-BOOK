const { validateText, simplify } = require('../../validations/validators')



exports.suggestionVal = (req, res, next) =>{
    try {
        let { title, description, code } = req.body
        title = validateText(title, 5, 40 );
        description = validateText(description, 5, 255);
        code = validateText(code, 7, 100000);
        const validated = simplify({
            title, description, code
        })
        if(validated.isValid){
            res.body.title = validated.data.title
            res.body.description = validated.data.description
            res.body.code = validated.data.code
            next()
        }
        else{
            return res.status(401).json({
                err:validated.err
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