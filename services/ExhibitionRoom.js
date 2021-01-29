const ExhibitionRoomModel = require('./../models/ExhibitionRoom');

/**
 * Este objeto contiene las funciones del servicio de cuartos de exhibiciones.
 */
const ExhibitionRoomService = {};

/**
 * 
 * @function
 * @param {string} roomCode
 * @param {string} exhibitions
 * @returns {Object} Si la verificación es correcta returna verdadero en el elemento 'success' y falso en caso contrario.
 */
ExhibitionRoomService.verifyFields = ({ roomCode, exhibitions }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  const roomCodeRegExp = new RegExp('^[a-zA-Z0-9]*$', 'g');

  if (!roomCode || !exhibitions) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing required fields. Request needs a room code and a list of exhibitions.'
      }
    };
  }
  if (!roomCodeRegExp.test(roomCode)) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Room code must not have spaces between words, punctuation or special characters.'
      }
    }
  }

  return serviceResponse;
}

/**
 * 
 * @async
 * @function
 * @param {string} roomCode
 * @param {Array} exhibitions
 * @returns {Object} El cuarto de exhibición creado.
 */
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

/**
 * 
 * @async
 * @function
 * @param {string} roomCode
 * @returns {Object} El cuarto de exhibición con el código de cuarto especificado.
 */
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

/**
 * 
 * @async
 * @function
 * @returns {Array} Lista con los cuartos de exhibición existentes
 */
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

/**
 * 
 * @async
 * @function
 * @param {string} _id
 * @returns {Object} El cuarto de exhibición con el _id especificado.
 */
ExhibitionRoomService.findOneById = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
      const exhibitionRoom = await ExhibitionRoomModel.findOne({ _id: _id }).exec();
      if (!exhibitionRoom) {
          serviceResponse = {
              success: false,
              content: {
                  error: 'Exhibition not found.'
              }
          }
      } else {
          serviceResponse.content = exhibitionRoom;
      }

      return serviceResponse;
  } catch(error) {
      throw new Error('Internal Server Error');
  }
}

/**
 * 
 * @async
 * @function
 * @param {string} _id 
 * @returns {Array} Lista vacía.
 */
ExhibitionRoomService.remove = async (_id) => {
  let serviceResponse = {
      success: true,
      content: {}
  }

  try {
      const exhibitionRoomDeleted = await ExhibitionRoomModel.findByIdAndDelete(_id).exec();
      if (!exhibitionRoomDeleted) {
          serviceResponse = {
              success: false,
              content: {
                  error: 'Something went wrong. Try again later.'
              }
          }
      }

      return serviceResponse;
  } catch(error) {
      throw new Error('Interal Server Error');
  }

}

module.exports = ExhibitionRoomService;