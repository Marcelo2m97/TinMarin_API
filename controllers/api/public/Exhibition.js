const ExhibitionService = require('./../../../services/Exhibition');

/**
 * Controlador utilizado para consultar todas las exhibiciones almacenadas
 * en la base de datos.
 */
const ExhibitionController = {};

/**
 * Consulta las exhibiciones
 * Esta función consulta las áreas de educación, si no hay ninguna el servidor responde
 * con un código 404. Si hay alguno el servidor responde con un código 200 y con una
 * cadena de objetos.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
ExhibitionController.find = async (req, res) => {
  if (!req.query.name) {
    try{
      const exhibitionsFound = await ExhibitionService.getAll();
    
      if (!exhibitionsFound.success) {
        return res.status(404).json(exhibitionsFound.content);
      }
    
      return res.status(200).json(exhibitionsFound.content);
    } catch(error) {
      return res.status(500).json({
        error: 'Internal Server Error.'
      })
    }
  } else {
    try {
      const exhibition = await ExhibitionService.findByName(req.query.name);
      if (!exhibition.success) {
        return res.status(404).json(exhibition.content);
      }
  
      return res.status(200).json(exhibition.content);
    } catch(error) {
      res.status(500).json({
        error: 'Internal Server Error.'
      })
    }
  }
}

/**
 * Consulta de exhibición
 * Esta función consulta por una exhibición en específico, si no es encontrada en el 
 * servidor responde con un código 404. Si es encontrado en el servidor responde con
 * un código 200 y con una el objeto.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
ExhibitionController.findOneById = async (req, res) => {
  const { _id } = req.params;

  try {
    const exhibitionFound = await ExhibitionService.findOneById(_id);
    if (!exhibitionFound.success) {
      return res.status(404).json(exhibitionFound.content);
    }

    return res.status(200).json(exhibitionFound.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

module.exports = ExhibitionController;