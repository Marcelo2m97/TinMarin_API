const RecommendedWebsiteService = require('./../../../services/RecommendedWebsite');

/**
 * Controlador utilizado para consultar todos los sitios recomendados almacenadas
 * en la base de datos.
 */
const RecommendedWebsiteController = {};

/**
 * Consulta los sitios recomendados
 * Esta función consulta los sitios recomendados, si no hay ninguna el servidor responde
 * con un código 404. Si hay alguno el servidor responde con un código 200 y con una
 * cadena de objetos.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
RecommendedWebsiteController.findAll = async (req, res) => {
  try {
    const recommendedWebsites = await RecommendedWebsiteService.findAll();
    if (!recommendedWebsites.success) {
      return res.status(404).json(recommendedWebsites.content);
    }

    return res.status(200).json(recommendedWebsites.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

module.exports = RecommendedWebsiteController;
