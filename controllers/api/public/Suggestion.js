const SuggestionService = require('./../../../services/Suggestion');

/**
 * Controlador utilizado para crear sugerencias en la base de datos.
 */
const SuggestionController = {}

/**
 * Creación de sugerencias
 * Esta función verifica que todos los campos requiriridos esten contenidos en el 
 * objeto recibido en la petición. Si la verificaión falla el servidor responde con
 * un código 400. Si la base de datos no puede ser accedida por algún motivo el servidor
 * responde con un código 503. Finalmente si todo es exitoso el servidor responde con un 
 * código 201 y el objeto de la sugerencia creada.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
SuggestionController.create = async (req, res) => {
  const suggestionValidated = SuggestionService.verifyFields(req.body);
  if (!suggestionValidated.success) {
    return res.status(400).json(suggestionValidated.content);
  }

  try {
    const suggestionCreated = await SuggestionService.create(req.body);
    if (!suggestionCreated.success) {
      return res.status(503).json(suggestionCreated.content);
    }

    return res.status(201).json(suggestionCreated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

module.exports = SuggestionController;