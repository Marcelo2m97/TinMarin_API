const FAQService = require('./../../../services/FAQ');

/**
 * Controlador utilizado para consultar todas las preguntas frecuentes
 * almacenadas en la base de datos.
 */
const FAQController = {};

/**
 * Consulta los pregutnas frecuentes
 * Esta función consulta las preguntas frecuentes, si no hay ninguna el servidor responde
 * con un código 404. Si hay alguno el servidor responde con un código 200 y con una
 * cadena de objetos.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
FAQController.findAll = async (req, res) => {
  try {
    const faqs = await FAQService.findAll();
    if (!faqs.success) {
      return res.status(404).json(faqs.content);
    }

    return res.status(200).json(faqs.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

module.exports = FAQController;