const ExhibitionRoomService = require('./../../services/ExhibitionRoom');

const ExhibitionRoomController = {};

ExhibitionRoomController.create = async (req, res) => {
  const verifiedExhibitionRoom = ExhibitionRoomService.verifyFields(req.body);
  if (!verifiedExhibitionRoom.success) {
    return res.status(400).json(verifiedExhibitionRoom.content);
  }

  try {
    const { roomCode } = req.body;
    const exhibitionRoom = await ExhibitionRoomService.findOneExhibitionRoomByRoomCode(roomCode);
    if (exhibitionRoom.success) {
      return res.status(403).json({
        error: 'Specified room code has already been used.'
      });
    }

    const exhibitionRoomCreated = await ExhibitionRoomService.create(req.body);
    if (!exhibitionRoomCreated.success) {
      return res.status(503).json(exhibitionRoomCreated.content);
    }

    return res.status(201).json(exhibitionRoomCreated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

ExhibitionRoomController.find = async (req, res) => {
  const roomCode = req.query.roomCode;
  if (!roomCode) {
    try {
      const exhibitionRooms = await ExhibitionRoomService.findAll();
      if (!exhibitionRooms.success) {
        return res.status(404).json(exhibitionRooms.content);
      }
      return res.status(200).json(exhibitionRooms.content);
    } catch(error) {
      return res.status(500).json({
        error: 'Internal Server Error.'
      })
    }
  } else {
    try {
      const exhibitionRoom = await ExhibitionRoomService.findOneExhibitionRoomByRoomCode(roomCode);
      if (!exhibitionRoom.success) {
        return res.status(404).json(exhibitionRoom.content);
      }
      return res.status(200).json(exhibitionRoom.content);
    } catch(error) {
      return res.status(500).json({
        error: 'Internal Server Error.'
      });
    }
  }
}

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