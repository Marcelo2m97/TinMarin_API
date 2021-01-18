const {verifyToken } = require('./../utils/JWTUtils');
const { verifyId } = require('./../utils/MongoUtils')

const middleware = {};

middleware.verifyAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({
      error: 'Authorization is required'
    });
  }

  const [prefix, token] = authorization.split(' ');
  if (prefix !== 'Bearer') {
    res.status(400).json({
      error: 'Incorrect prefix'
    });
  } 

  const tokenObject = verifyToken(token);
  if (!tokenObject) {
    return res.status(401).json({
      error: 'Invalid token'
    })
  }

  const userId = tokenObject._id;
  if(!verifyId(userId)) {
    return res.status(400).json({
      error: 'Error in Id'
    });
  }

  next();
}

module.exports = middleware;