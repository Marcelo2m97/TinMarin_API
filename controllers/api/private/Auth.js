const UserService = require('../../../services/User');

const AuthController = {};

AuthController.register = async (req, res) => {
  const fieldsValidation = UserService.verifyRegisterFields(req.body);
  if(!fieldsValidation.success) {
    return res.status(400).json(fieldsValidation.content);
  }

  try{
    const userExist = await UserService.findOneUsername(req.body.username);

    if(userExist.success) {
      return res.status(403).json({
        error: 'User already exists.'
      });
    }

    const userSaved = await UserService.register(req.body);
    if (!userSaved.success) {
      return res.status(503).json(userSaved.content);
    }

    return res.status(201).json(userSaved.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

module.exports = AuthController;