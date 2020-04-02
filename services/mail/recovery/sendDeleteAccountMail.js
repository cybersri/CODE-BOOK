const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('SECRET');
const {
    deleteAccount
} = require('./deleteAccount')


const url = config.get('HOST') + ':' + config.get('PORT')

exports.sendDeleteAccountMail = async (client, isOrg) => {
    try {
        const token = await jwt.sign({
            email: client.email,
            isOrg: isOrg,
            action: "delete account"
        },
            secret+client.password, {
            expiresIn: '15m'
        });
        return await deleteAccount(client.name, client.email, url+'/recovery/'+token);
    } catch (err) {
        return err;
    }


}