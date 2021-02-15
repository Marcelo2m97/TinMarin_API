const UserService = require('../../../services/User');
const { createToken } = require('./../../../utils/JWTUtils');

/**
 *  Este objeto contiene las funciones del controlador  para la autenticación.
 *  Esto son invocados mediante una ruta.
 */ 
const AuthController = {};

/**
 * Iniciar sesión
 * Esta función llama inicialmente a la función que verifica los campos
 * recibido en la petición al servidor. Si alguno de los campos no son
 * contenidos el servidor responde a la petición con un código 400, de
 * no ser así se revisa si no existe un usuario con el nombre de usuario
 * que se indicó en la petición el servidor responde con un código 404
 * sino se procede a verificar si la contraseña indicada en la petición
 * es la misma que la que se tiene almacenada en la base de datos para
 * usuario inidicado, si no hay coincidencia el servidor responde con
 * un código 401, en caso que si haya coincidencia el servidor responde
 * con un código 200 y retorna un token.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
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