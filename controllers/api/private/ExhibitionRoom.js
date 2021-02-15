const ExhibitionRoomService = require('./../../../services/ExhibitionRoom');

/**
 * Controlador utilizado para la eliminación de cuartos de exhibición
 */
const ExhibitionRoomController = {};

/**
 * Eliminar exhibición
 * Esta función verifica que el _id proveído como parámetro en la ruta sea válido,
 * sino el servidor responde con un código 400. Si la verificación es exitosa se 
 * procede a verificar que haya en la base de datos una exhibición con el _id indicado,
 * si no existe el servidor responde con un código 404. Si el objeto existe en la base
 * de datos se procede a eliminarlo, pero si la base de datos no está disponible el 
 * serivodor responde con un código 503. En caso que la base de datos esté disponible 
 * y la acción se completa el servidor responde con un código 204 y un objeto vacío.
 * 
 * @param {Object} petición realizada al servidor
 * @param {Object} respuesta a la petición realizada
 */
ExhibitionRoomController.remove = async (req, res) => {
  try {
    const exhibitionRoom = await ExhibitionRoomService.findOneById(req.params._id);
    if (!exhibitionRoom.success) {
      return res.status(404).json(exhibitionRoom.content);
    }
    const exhibitionRoomDeleted = await ExhibitionRoomService.remove(req.params._id);
    if (!exhibitionRoomDeleted.success) {
      return res.status(503).json(exhibitionRoomDeleted.content);
    }

    return res.status(204).json(exhibitionRoomDeleted.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

module.exports = ExhibitionRoomController;