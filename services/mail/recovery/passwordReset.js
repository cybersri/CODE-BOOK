const { ForgotPasswordTemplate } = require('../../../templates/ForgotPassword.template')
const { sendEmail } = require('../mail')
const config = require('config')

const product = config.get('PRODUCT')
const web = config.get('WEBSITE')
const details = config.get('DETAILS')

exports.passwordReset = (email, url) =>{
    
    const template = ForgotPasswordTemplate(product, email, url, web, details)

    
    return(
        sendEmail(
            email,
            'You requested password reset',
            template
        ))
}
