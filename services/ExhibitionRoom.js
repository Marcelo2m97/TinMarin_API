const ExhibitionRoomModel = require('./../models/ExhibitionRoom');

const ExhibitionRoomService = {};

ExhibitionRoomService.verifyFields = ({ roomCode, exhibitions }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  if (!roomCode || !exhibitions) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing required fields. Request needs a room code and a list of exhibitions.'
      }
    };
  }

  return serviceResponse;
}

ExhibitionRoomService.create = async ({ roomCode, exhibitions }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  const exhibitionRoom = new ExhibitionRoomModel({
    roomCode,
    exhibitions
  });
  try {
    const exhibitionRoomCreated = await exhibitionRoom.save();
    if (!exhibitionRoomCreated) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Exhibition room could not be created.'
        }
      };
    } else {
      serviceResponse.content = exhibitionRoomCreated;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error(error);
  }

}

ExhibitionRoomService.findOneExhibitionRoomByRoomCode = async (roomCode) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const roomExhibition = await ExhibitionRoomModel.findOne({ roomCode: roomCode }).exec();
    if (!roomExhibition) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No exhibition room found with specified exhibition code.'
        }
      }
      return serviceResponse;
    } else {
      serviceResponse.content = roomExhibition;
      return serviceResponse;
    }
  } catch(error) {
    throw new Error('Internal Server Error.')
  }
}

module.exports = ExhibitionRoomService;