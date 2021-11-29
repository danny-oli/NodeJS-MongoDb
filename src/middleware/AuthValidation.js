const keys = require("../config/keys");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

// Config ambient variables
dotenv.config()

const AuthValidation = (req, res, next) => {
  const headerToken = req.headers['x-access-token'];

  if (!headerToken) return res.status(401).json({ auth: false, message: 'No token provided.' });
  jwt.verify(headerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      res.status(500).json({ auth: false, message: 'Failed to authenticate token.', error: err })
    else {
      req.userId = decoded.id;
      next();
    }
  })
};

module.exports = AuthValidation;
