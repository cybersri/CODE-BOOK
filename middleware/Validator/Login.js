const { validateEmail, validateBool, validatePassword, simplify } = require('../../validations/validators')



exports.loginVal = (req, res, next) =>{
    try {
        let { email, password, isOrg } = req.body
        email = validateEmail(email,true);
        password = validatePassword(password);
        isOrg = validateBool(isOrg);
        const validated = simplify({
            email, password, isOrg
        })
        if(validated.isValid){
            req.body = validated.data
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