const SuggestionTypeService = require('./../../../services/SuggestionType');
const { verifyId } = require('./../../../utils/MongoUtils');

/**
 * Controlador utilizado para consultar todos los tipos de sugerencia almacenadas
 * en la base de datos.
 */
const SuggestionTypeController = {}

/**
 * Consulta los tipos de sugerencia
 * Esta función consulta los tipos de sugerencia, si no hay ninguna el servidor responde
 * con un código 404. Si hay alguno el servidor responde con un código 200 y con una
 * cadena de objetos.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
SuggestionTypeController.findAll = async (req, res) => {
  try {
    const suggestionTypes = await SuggestionTypeService.findAll();
    if (!suggestionTypes.success) {
      return res.status(404).json(suggestionTypes.content);
    }

    return res.status(200).json(suggestionTypes.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

module.exports = SuggestionTypeController;