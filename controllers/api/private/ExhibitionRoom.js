const ExhibitionRoomService = require('./../../../services/ExhibitionRoom');

const ExhibitionRoomController = {};

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