const SuggestionService = require('./../../../services/Suggestion');

/**
 * Controlador utilizado para la consulta y eliminación de sugerencias
 */
const SuggestionController = {}

/**
 * Consulta de sugerencias
 * Esta función consulta las sugerencias, si no hay ninguna el servidor responde con
 * un código 404. Si hay alguno el servidor responde con un código 200 y con una
 * cadena de objetos.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
SuggestionController.findAll = async (req, res) => {
  try{
    const suggestions = await SuggestionService.findAll();
    if (!suggestions.success) {
      return res.status(404).json(suggestions.content);
    }

    return res.status(200).json(suggestions.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

/**
 * Eliminar sugerencia
 * Esta función verifica que haya en la base de datos una sugreneica con el _id indicado, 
 * si no existe el servidor responde con un código 404. Si el objeto existe en la base de 
 * datos se procede a eliminarlo, pero si la base de datos no está disponible el serivodor 
 * responde con un código 503. En caso que la base de datos esté disponible y la acción se 
 * completa el servidor responde con un código 204 y un objeto vacío.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
SuggestionController.remove = async (req, res) => {
  try {
    const suggestion = await SuggestionService.findOneById(req.params._id);
    if (!suggestion.success) {
      return res.status(404).json(suggestion.content);
    }
    const suggestionDeleted = await SuggestionService.remove(req.params._id);
    if (!suggestionDeleted.success) {
      return res.status(503).json(suggestionDeleted.content);
    }

    return res.status(204).json(suggestionDeleted.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

module.exports = SuggestionController;