const  { deleteAccountTemplate} = require('../../../templates/deleteAccount.template')
const { sendEmail } = require('../mail')
const config = require('config')

const product = config.get('PRODUCT')
const web = config.get('WEBSITE')
const details = config.get('DETAILS')

exports.deleteAccount = (name, email, action_url) =>{
    
    const template = deleteAccountTemplate(name, email, action_url, product, details)

    
    return(
        sendEmail(
            email,
            'Warning! You requested to delete your account',
            template
        ))
}
