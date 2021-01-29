const SuggestionModel = require('./../models/Suggestion');

/**
 * Este objeto contiene las funciones del servicio de sugerencia.
 */
const SuggestionService = {}

/**
 * 
 * @function
 * @param {string} suggestionType
 * @param {string} suggestion
 * @returns {Object} Si la verificación es correcta returna verdadero en el elemento 'success' y falso en caso contrario.
 */
SuggestionService.verifyFields = ({ suggestionType, suggestion }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  if (!suggestionType || !suggestion) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing required fields.'
      }
    }

    return serviceResponse;
  }

  return serviceResponse;
}

/**
 * 
 * @function
 * @param {string} suggestionType
 * @param {string} suggestion
 * @returns {Object} La sugerencia creada.
 */
SuggestionService.create = async ({ suggestionType, suggestion }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  const newSuggestion = new SuggestionModel({
    suggestionType,
    suggestion
  });
  try {
    const suggestionSaved = await newSuggestion.save();
    if (!suggestionSaved) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Suggestion could not be saved.'
        }
      }
    } else {
      serviceResponse.content = suggestionSaved;
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
 * @returns {Array} Lista con las sugerencias existentes.
 */
SuggestionService.findAll = async () => {
  let serviceResponse = {
    success: true,
    content: {}
  }
  try {
    const suggestions = await SuggestionModel.find();
    if (!suggestions) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No suggestion found.'
        }
      };
    } else {
      serviceResponse.content = suggestions;
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
 * @returns {Object} La sugerencia con el _id especificado.
 */
SuggestionService.findOneById = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const suggestionFound = await SuggestionModel.findById(_id);
    if (!suggestionFound) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Suggestion not found.'
        }
      }
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
 * @returns {Array} Lista vacía.
 */
SuggestionService.remove = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const suggestionsDeleted = await SuggestionModel.findByIdAndDelete(_id).exec();
    if (!suggestionsDeleted) {
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

module.exports = SuggestionService