const RecommendationService = require('./../../../services/Recommendation');

/**
 * Controlador utilizado para consultar todas las recomendaciones almacenadas
 * en la base de datos.
 */
const RecommendationController = {};

/**
 * Consulta los recomendaciones
 * Esta función consulta las recomendaciones, si no hay ninguna el servidor responde
 * con un código 404. Si hay alguno el servidor responde con un código 200 y con una
 * cadena de objetos.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
RecommendationController.findAll = async (req, res) => {
  try {
    const recommendations = await RecommendationService.findAll();
    if (!recommendations.success) {
      return res.status(404).json(recommendations.content);
    }

    return res.status(200).json(recommendations.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

module.exports = RecommendationController;