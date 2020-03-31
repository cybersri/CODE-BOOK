const { emailVerificationTemplate } = require('../../../templates/EmailVerification.template')
const { sendEmail } = require('../mail')
const config = require('config')

const product = config.get('PRODUCT')
const details = config.get('DETAILS')

exports.verificationEmail = (name, email, url) =>{

    const template = emailVerificationTemplate(name, email, url, product, details)
    
    return(
        sendEmail(
            email,
            'Please verify your email',
            template
        ))
}
