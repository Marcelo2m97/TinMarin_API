const ExhibitionRoomModel = require('./../models/ExhibitionRoom');
const ExhibitionModel = require('./../models/Exhibition');

const ExhibitionRoomService = {};

ExhibitionRoomService.verifyFields = ({ roomCode, exhibitions }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  const roomCodeRegExp = '[A-Za-z0-9]';

  if (!roomCode || !exhibitions) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing required fields. Request needs a room code and a list of exhibitions.'
      }
    };
  }

  if (!roomCode.match(roomCodeRegExp)) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Room code must not have spaces between words, punctuation or special characters.'
      }
    }
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
    const exhibitionRoom = await ExhibitionRoomModel.findOne({ roomCode: roomCode }).populate({ 
      path: 'exhibitions',
      model: 'Exhibition'
    }).exec();
    if (!exhibitionRoom) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No exhibition room found with specified exhibition code.'
        }
      }
      return serviceResponse;
    } else {
      serviceResponse.content = exhibitionRoom;
      return serviceResponse;
    }
  } catch(error) {
    throw new Error('Internal Server Error.')
  }
}

ExhibitionRoomService.findAll = async () => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const exhibitionRooms = await ExhibitionRoomModel.find().populate({ 
      path: 'exhibitions',
      model: 'Exhibition'
    });
    if (!exhibitionRooms) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No exhibition room was found.'
        }
      }
    } else {
      serviceResponse.content = exhibitionRooms;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error('Internal Server Error.')
  }
}

module.exports = ExhibitionRoomService;