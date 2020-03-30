const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('SECRET');
const {
    verificationEmail
} = require('./verificationEmail')


const url = config.get('HOST') + ':' + config.get('PORT')

exports.sendVerificationEmail = async (client, isOrg) => {
    if (isOrg) {
        try {
            const token = await jwt.sign({
                    email: client.email,
                    isOrg: isOrg,
                },
                secret + client.status, {
                    expiresIn: '1h'
                });

            return await verificationEmail(
                client.name,
                client.email,
                url + '/org/verifymail/' + token);
        } catch (err) {
            return err;
        }
    } else {

        // code for getting verify email for non organization accounnt goes here

    }


}