const EducationAreaModel = require('./../models/EducationArea');

/**
 * Este objeto contiene las funciones del servicio de áreas de educación.
 */
const EducationAreaService = {};

/**
 * 
 * @function
 * @param {string} name
 * @returns {Object} Si la verificación es correcta returna verdadero en el elemento 'success' y falso en caso contrario.
 */
EducationAreaService.verifyFields = ({ name }) => {
  let serviceResponse = {
    success: true,
    content: {}
  };

  if (!name) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing name for the education area.'
      }
    }
  }

  return serviceResponse;
}

/**
 * 
 * @function
 * @param {string} name 
 * @returns {Object} Si la verificación es correcta returna verdadero en el elemento 'success' y falso en caso contrario.
 */
EducationAreaService.verifyUpdate = ({ name }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  if (!name) {
    serviceResponse = {
      success: false,
      content: {
        error: 'No changes to make.'
      }
    }

    return serviceResponse;
  }

  if (name) serviceResponse.content.name = name;

  return serviceResponse;
}

/**
 * 
 * @async
 * @function
 * @param {string} name
 * @returns {Object} El área de educación creada.
 */
EducationAreaService.create = async ({ name }) => {
  let serviceResponse = {
    success: true,
    content: {}
  };

  const educationArea = new EducationAreaModel({ name });
  try {
    const educationAreaCreated = await educationArea.save();
    if (!educationAreaCreated) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Education area could not be saved.'
        }
      };
    } else {
      serviceResponse.content = educationAreaCreated;
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
 * @param {string} name
 * @returns {Object} El área de educación con el nombre especificado.
 */
EducationAreaService.findOneByName = async ({ name }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try{
    const educationArea = await EducationAreaModel.findOne({ name: name }).exec();
    if (!educationArea) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Education Area not found.'
        }
      }
    } else {
      serviceResponse.content = educationArea;
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
 * @returns {Array} Lista con los  existentes
 */
EducationAreaService.findAll = async () => {
  let serviceResponse = {
    success: true,
    content: {}
  }
  try {
    const educationAreas = await EducationAreaModel.find();
    if (!educationAreas) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No education area found.'
        }
      };
    } else {
      serviceResponse.content = educationAreas;
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
 * @param {string} _id
 * @returns {Object} El área de educación con el _id especificado.
 */
EducationAreaService.findOneById = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const educationAreaFound = await EducationAreaModel.findById(_id);
    if (!educationAreaFound) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Education area not found.'
        }
      };
    } else {
      serviceResponse.content = educationAreaFound;
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
 * @param {object} educationArea
 * @param {object} newContent
 * @returns {object} El área de educación actualizada.
 */
EducationAreaService.updateOneById = async (educationArea, newContent) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const updatedEducationArea = await EducationAreaModel.findByIdAndUpdate(educationArea._id, { ...newContent });
    if (!updatedEducationArea) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Something went wrong.'
        }
      }
    } else {
      serviceResponse.content = EducationAreaModel.findById(educationArea._id).exec();
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
EducationAreaService.remove = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const educationAreaDeleted = await EducationAreaModel.findByIdAndDelete(_id).exec();
    if (!educationAreaDeleted) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Something went wrong.'
        }
      }
    }

    return serviceResponse;
  } catch(error) {
    throw new Error('Internal Server Error.')
  }
}

module.exports = EducationAreaService;