const UserService = require('../../../services/User');
const { createToken } = require('./../../../utils/JWTUtils');

const AuthController = {};

AuthController.login = async (req, res) => {
  const fieldsValidation = UserService.verifyLoginFields(req.body);
  if (!fieldsValidation.success) {
    return res.status(400).json(fieldsValidation.content);
  }
  
  try {
    const userExists = await UserService.findOneUsername(req.body.username);
    if (!userExists.success) {
      return res.status(404).json(userExists.content);
    }
    
    const user = userExists.content;
    const userMatch = UserService.login(user, req.body.password);
    if (!userMatch.success) {
      return res.status(401).json(userMatch.content);
    }
    
    return res.status(200).json({
      token: createToken(user._id)
    });
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

module.exports = AuthController;