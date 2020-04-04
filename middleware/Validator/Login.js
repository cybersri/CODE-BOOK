const { validateEmail, validatePassword, validateBool, filterPaper} = require('filter-paper')


exports.loginVal = (req, res, next) =>{
    try {
        let { email, password, isOrg } = req.body
        email = validateEmail({
            email,
            normalize: true
        });
        password = validatePassword(password)
        isOrg = validateBool({value:isOrg});
        const filtered = filterPaper({email, password, isOrg})
        if(filtered.isValid){
            req.body = filtered.data
            next()
        }
        else{
            return res.status(401).json({
                err:filtered.err
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