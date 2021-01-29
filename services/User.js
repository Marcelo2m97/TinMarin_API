const UserModel = require('./../models/User');
const Crypto = require('crypto');

const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})');

/**
 * Este objeto contiene las funciones del servicio de usuarios.
 */
const UserService = {}

/**
 * 
 * @function
 * @param {string} username
 * @param {string} password
 * @returns {object} Si la verificación es correcta returna verdadero en el elemento 'success' y falso en caso contrario.
 */
UserService.verifyRegisterFields = ({ username, password }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  if (!username || !password) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing required fields.'
      }
    }
    return serviceResponse;
  }

  if (!passwordRegex.test(password)) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Password must contain at least 8 characters and also must be at least one number, one uppercase character, one lowercase character, .'
      }
    }
    return serviceResponse;
  }

  return serviceResponse;
}

/**
 * 
 * @function
 * @param {string} username
 * @param {string} password
 * @returns {object} Si la verificación es correcta returna verdadero en el elemento 'success' y falso en caso contrario.
 */
UserService.verifyLoginFields = ({ username, password }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  if (!username || !password) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing required fields.'
      }
    }
    return serviceResponse;
  }

  return serviceResponse;
}

/**
 * 
 * @async
 * @function
 * @param {string} username
 * @returns {object} Usuario con el nombre de usuario especificado.
 */
UserService.findOneUsername = async (username) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const user = await UserModel.findOne({ username: username }).exec();
    if (!user) {
      serviceResponse = {
        success: false,
        content: {
          error: 'User not found.'
        }
      } 
    } else {
      serviceResponse.content = user;
    }
      
    return serviceResponse;
  } catch(error) {
    throw new Error("Internal Server Error.");
  }
}

/**
 * 
 * @async
 * @function
 * @param {string} username
 * @param {string} password
 * @returns {object} El usuario registrado.
 */
UserService.register = async ({ username, password }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  const user = new UserModel({ username, password });
  try {
    const userSaved = await user.save();
    if (!userSaved) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Something went wrong.'
        }
      }
    } else {
      serviceResponse.content = userSaved;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error('Internal Server Error.');
  }
}

/**
 * 
 * @async
 * @function
 * @param {string} username
 * @param {string} password
 * @returns {string} token.
 */
UserService.login = (user, password) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  if (Crypto.createHmac("sha256", password).digest("hex") !== user.hashedPassword) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Password does not match for given username'
      }
    }
  }

  return serviceResponse;
}

module.exports = UserService;