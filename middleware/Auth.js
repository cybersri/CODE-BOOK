const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('SECRET');
const OrganizationModel = require('../models/Organization.model');
const UserModel = require('../models/User.model');
exports.getToken = async (client, isOrg) => {
  try {
    const token = await jwt.sign({
      id: client.id,
      email: client.email,
      isOrg: isOrg,
    },
      secret + client.password, {
      expiresIn: '7d'
    });

    return token;
  } catch (err) {
    return err;
  }
}

exports.user = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const { email, isOrg } = jwt.decode(token)
    const curUser = isOrg ? await OrganizationModel.findOne({ email:email }).select('+password') : await (await UserModel.findOne({ email }).select('+password'));

    if (!curUser) {
      return res.status(401).json({
        msg: 'Un Authorized'
      })
    }
    else {
      jwt.verify(token, secret + curUser.password, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            msg: 'Un Authorized',err
          })
        }
        else {
            curUser.password = undefined
            req.isOrg = isOrg;
            req.user = curUser;
          next();
        }
      })
    }
  }
  catch (err) {
    return res.status(401).json({
      msg: 'Un Authorized',err
    })
  }
}
