const jwt = require('jsonwebtoken');
const User = require("../models/User");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; 
    if(!authHeader)
      throw new Error('no token provided.');

    const parts = authHeader.split(' ');

    if(!parts .length === 2)
      throw new Error('Token error');
  
  const [schema, token] = parts;
  if (!/^Bearer$/i.test(schema)){ 
      throw new Error('Malformatted token');
    }

    jwt.verify(token, process.env.API_SALT, (err, decoded) => {
        if (err) {
            throw new Error('Invalid token');
        }
        req.id = decoded.id;
        return next();
    });
    

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};