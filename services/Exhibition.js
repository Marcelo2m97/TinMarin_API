const ExhibitionModel = require('./../models/Exhibition');

/**
 * Este objeto contiene las funciones del servicio de exhibiciones.
 */
const ExhibitionService = {};

/**
 * 
 * @function
 * @param {string} name
 * @param {string} description
 * @param {Array} images
 * @param {Array} educationArea 
 * @param {number} minimumAge
 * @param {number} maximumAge
 * @param {number} duration
 * @param {number} capacity
 * @returns {Object} Si la verificación es correcta returna verdadero en el elemento 'success' y falso en caso contrario.
 */
ExhibitionService.verifyFields = ({ name, description, images, educationArea, minimumAge, maximumAge, duration, capacity }) => {
  let serviceResponse = {
    success: true,
    content: {
      message: ""
    }
  }

  if (!name || !description || !images || !educationArea || !minimumAge || !maximumAge || !duration || !capacity) {
    serviceResponse = {
      success: false,
      content: {
        error: "Missing required fields."
      }
    }
  }

  return serviceResponse;
}

/**
 * 
 * @function
 * @param {string} name
 * @param {string} lowercaseName
 * @param {string} description
 * @param {Array} images
 * @param {Array} sponsorName
 * @param {Array} sponsorLogo
 * @param {Array} educationArea 
 * @param {number} minimumAge
 * @param {number} maximumAge
 * @param {number} duration
 * @param {number} capacity
 * @param {string} curiousInfo
 * @returns {Object} Si la verificación es correcta returna verdadero en el elemento 'success' y falso en caso contrario.
 */
ExhibitionService.verifyUpdate = ({ name, lowercaseName, description, images, sponsorName, sponsorLogo, educationArea, minimumAge, maximumAge, duration, capacity, curiousInfo }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  if (!name && !lowercaseName && !description && !images && !sponsorName && !sponsorLogo && !educationArea && !minimumAge && !maximumAge && !duration && !capacity && !curiousInfo) {
    serviceResponse = {
      success: false,
      content: {
        error: 'No changes to make.'
      }
    }

    return serviceResponse;
  }

  if (name) serviceResponse.content.name = name;
  if (lowercaseName) serviceResponse.content.lowercaseName = lowercaseName;
  if (description) serviceResponse.content.description = description;
  if (images) serviceResponse.content.images = images;
  if (sponsorName) serviceResponse.content.sponsorName = sponsorName;
  if (sponsorLogo) serviceResponse.content.sponsorLogo = sponsorLogo;
  if (educationArea) serviceResponse.content.educationArea = educationArea;
  if (minimumAge) serviceResponse.content.minimumAge = minimumAge;
  if (maximumAge) serviceResponse.content.maximumAge = maximumAge;
  if (duration) serviceResponse.content.duration = duration;
  if (capacity) serviceResponse.content.capacity = capacity;
  if (curiousInfo) serviceResponse.content.curiousInfo = curiousInfo;

  return serviceResponse;
}

/**
 * 
 * @async
 * @function
 * @param {string} name
 * @param {string} description
 * @param {Array} images
 * @param {Array} sponsorName
 * @param {Array} sponsorLogo
 * @param {Array} educationArea 
 * @param {number} minimumAge
 * @param {number} maximumAge
 * @param {number} duration
 * @param {number} capacity
 * @param {string} curiousInfo
 * @returns {Object} La exhibición creada.
 */
ExhibitionService.create = async ({ name, description, images, sponsorName, sponsorLogo, educationArea, minimumAge, maximumAge, duration, capacity, curiousInfo }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  const lowercaseName = name.toLowerCase();
  try {
    const newExhibition = new ExhibitionModel({
      name,
      lowercaseName,
      description,
      images,
      sponsorName,
      sponsorLogo,
      educationArea,
      minimumAge,
      maximumAge,
      duration,
      capacity,
      curiousInfo
    });

    const newExhibitionWasCreated = await newExhibition.save();
    if (!newExhibitionWasCreated) {
      serviceResponse = {
        success: false,
          content: {
            error: "Exhibition could not be created."
          }
        }
    } else {
      serviceResponse.content = newExhibitionWasCreated;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error("Internal Server Error.")
  }
}

/**
 * 
 * @async
 * @function
 * @param {string} name
 * @returns {Object} La exhibición con el nombre especificado.
 */
ExhibitionService.findOneByName = async ({ name }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try{
    const exhibition = await ExhibitionModel.findOne({ name: name }).exec();
    if (!exhibition) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Exhibition not found.'
        }
      }
    } else {
      serviceResponse.content = exhibition;
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
 * @returns {Array} Lista de exhibiciones existentes.
 */
ExhibitionService.getAll = async() => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const exhibitions = await ExhibitionModel.find();
    if (!exhibitions) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No exhibition found.'
        }
      }
    } else {
      serviceResponse.content = exhibitions;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error('Internal Server Error')
  }
}

/**
 * 
 * @async
 * @function
 * @param {string} name
 * @returns {Object} La exhibición con el nombre especificado.
 */
ExhibitionService.findByName = async (name) => {
  let serviceResponse = {
    success: true,
    content: {}
  }
  const lowercaseName = name.toLowerCase();
  try {
    const exhibitions = await ExhibitionModel.find({ lowercaseName: { $regex: lowercaseName } });
    if (!exhibitions) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No exhibition found with the specified name.'
        }
      }
    } else {
      serviceResponse.content = exhibitions;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error('Internal Server Error.');
  }
}

/**
 * 
 * @async
 * @function
 * @param {string} _id
 * @returns {Object} La exhibición con el _id especificado.
 */
ExhibitionService.findOneById = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const exhibition = await ExhibitionModel.findOne({ _id: _id }).exec();
    if (!exhibition) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Exhibition not found.'
        }
      }
    } else {
      serviceResponse.content = exhibition;
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
 * @param {object} exbhition
 * @param {object} newContent
 * @returns {object} La exhibición actualizada.
 */
ExhibitionService.updateOneById = async (exhibition, newContent) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const updatedExhibition = await ExhibitionModel.findByIdAndUpdate(exhibition._id, { ...newContent });
    if (!updatedExhibition) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Something went wrong.'
        }
      }
    } else {
      serviceResponse.content = await ExhibitionModel.findById(exhibition._id).exec();
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
ExhibitionService.remove = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const exhibitionDeleted = await ExhibitionModel.findByIdAndDelete(_id).exec();
    if (!exhibitionDeleted) {
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

module.exports = ExhibitionService;