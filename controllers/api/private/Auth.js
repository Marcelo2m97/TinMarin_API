const UserService = require('../../../services/User');

/**
 *  Este objeto contiene las funciones del controlador  para la autenticación.
 *  Esto son invocados mediante una ruta.
 */ 
const AuthController = {};

/**
 * Registrar usuarios
 * Esta función llama inicialmente a la función que verifica los campos
 * recibido en la petición al servidor. Si alguno de los campos no son
 * contenidos el servidor responde a la petición con un código 400, de
 * no ser así se realiza una revisión para verificar que el nombre del
 * usuario no está siendo utilizado por otro usuario. Si el nombre de
 * usuario está en uso el servidor responde con un código 403. Sino se
 * hace el registro del usuario en la base de datos, si la base no
 * estuviera disponible por algún motivo el servidor responde con el
 * código 503. Si el registro se realiza con existo el servidor responde
 * con un código 201.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
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