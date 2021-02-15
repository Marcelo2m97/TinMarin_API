const EducationAreaService = require('./../../../services/EducationArea');

/**
 * Controlador utilizado para consultar todas las áreas de educación almacenadas
 * en la base de datos.
 */
const EducationAreaController = {};

/**
 * Consulta de exhibiciones
 * Esta función consulta las exhibiciones, si no hay ninguna el servidor responde con 
 * un código 404. Si hay alguno el servidor responde con un código 200 y con una
 * cadena de objetos.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
EducationAreaController.findAll = async (req, res) => {
  try {
    const educationAreas = await EducationAreaService.findAll();
    if (!educationAreas.success) {
      return res.status(404).json(educationAreas.content);
    }

    return res.status(200).json(educationAreas.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

module.exports = EducationAreaController;