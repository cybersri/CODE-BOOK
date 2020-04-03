
const { filterPaper, validateEmail, validateString, validateAddress, validateNumberLength, validatePassword} = require('filter-paper')

exports.orgSignUpVal = (req, res, next) =>{
    try {
        let { email, name, password, phone, address } = req.body
        email = validateEmail({email, normalize:true})
        name = validateString({
            value: name,
            pattern: 'alphaWithSpace',
            min:4,
            max:20
        })
        password = validatePassword(password)
        phone = validateNumberLength({
            value:phone,
            name: 'phone number',
            min:10,
            max:10
        })
        address = validateAddress(address)
        const filtered = filterPaper({email, name, password, phone, address})

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

exports.signUpVal = (req,res,next)=>{
    try {
        let { email, name, password, phone, address, organization } = req.body
        email = validateEmail({email, normalize:true})
        name = validateString({
            value: name,
            pattern: 'alphaWithSpace',
            min:4,
            max:20
        })
        password = validatePassword(password)
        phone = validateNumberLength({
            value:phone,
            name: 'phone number',
            min:10,
            max:10
        })
        address = validateAddress(address)
        organization = validateString({
            value:organization,
            name:'organization',
            pattern:'alphaWithSpace',
            min:4,
            max:20
        })
        const filtered = filterPaper({email, name, password, phone, address, organization})

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