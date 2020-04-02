const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('SECRET');
const {
    passwordReset
} = require('./passwordReset')


const url = config.get('HOST') + ':' + config.get('PORT')

exports.sendPasswordResetMail = async (client, isOrg) => {
    try {
        const token = await jwt.sign({
            email: client.email,
            isOrg: isOrg,
            action: "reset password"
        },
            secret+client.password, {
            expiresIn: '15m'
        });

        return await passwordReset(client.email, url+'/recovery/'+token);
    } catch (err) {
        return err;
    }


}