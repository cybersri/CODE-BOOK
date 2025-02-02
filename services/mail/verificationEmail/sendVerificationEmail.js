const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('SECRET');
const {
    verificationEmail
} = require('./verificationEmail')


const url = config.get('HOST') + ':' + config.get('PORT')

exports.sendVerificationEmail = async (client, isOrg) => {
    try {
        const token = await jwt.sign({
            email: client.email,
            isOrg: isOrg,
            action: "verify"
        },
            secret, {
            expiresIn: '1h'
        });

        return await verificationEmail(
            client.name,
            client.email,
            url + '/verifymail/' + token);
    } catch (err) {
        return err;
    }


}