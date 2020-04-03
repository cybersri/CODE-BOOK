const { validateEmail, validateName, validatePassword, validatePhone, validateAddress, simplify } = require('../../validations/validators')



exports.orgSignUpVal = (req, res, next) =>{
    try {
        let { email, name, password, phone, address } = req.body
        email = validateEmail(email,true);
        name = validateName(name,'Organization Name', 'alphaWithSpace', 3, 25);
        password = validatePassword(password);
        phone = validatePhone(phone);
        address = validateAddress(address);
        const validated = simplify({
            email, name, password, phone, address
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

exports.signUpVal = (req,res,next)=>{
    try {
        let { email, name, password, phone, address, organization } = req.body
        email = validateEmail(email,true);
        name = validateName(name,'User Name', 'alphaWithSpace', 3, 25);
        password = validatePassword(password);
        phone = validatePhone(phone);
        address = validateAddress(address);
        organization = validateName(organization,'Organization Name', 'alphaWithSpace', 3, 25);
        const validated = simplify({
            email, name, password, phone, address, organization
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