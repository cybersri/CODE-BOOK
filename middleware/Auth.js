const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('SECRET');
const OrganizationModel = require('../models/Organization.model');
exports.getToken = async (client, isOrg) => {
  try {
    const token = await jwt.sign(
      {
        email: client.email,
        isOrg: isOrg
      },
      secret + client.password,
      {
        expiresIn: '7d'
      }
    );

    return token;
  } catch (err) {
    return err;
  }
};

exports.user = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { email, isOrg } = jwt.decode(token);
    if (isOrg) {
      const curUser = await OrganizationModel.findOne({ email });
      if (!curUser) {
        return res.status(401).json({
          msg: 'Un Authorized'
        });
      } else {
        jwt.verify(token, secret + curUser.password, (err, decoded) => {
          if (err) {
            return res.status(401).json({
              msg: 'Un Authorized'
            });
          } else {
            next();
          }
        });
      }
    }
  } catch (err) {
    return res.status(401).json({
      msg: 'Un Authorized'
    });
  }
};
