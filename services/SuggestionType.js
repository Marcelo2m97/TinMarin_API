const SuggestionTypeModel = require('./../models/SuggestionType');

const SuggestionTypeService = {}

SuggestionTypeService.verifyFields = ({ name }) => {
  let serviceResponse = {
    success: true,
    content: {
      message: 'Fields validated successfully.'
    }
  }

  if (!name) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing name field.'
      }
    }

    return serviceResponse;
  }

  return serviceResponse;
}

SuggestionTypeService.verifyUpdate = ({ name }) => {
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

SuggestionTypeService.create = async ({ name }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const suggestionTypeToCreate = new SuggestionTypeModel({ name });
    const suggestionTypeCreated = await suggestionTypeToCreate.save();
    if (!suggestionTypeCreated) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Something went wrong when saving the Suggestion Type.'
        }
      }
    } else {
      serviceResponse.content = suggestionTypeCreated;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error('Internal Server Error.');
  }
}

SuggestionTypeService.findOneByName = async ({ name }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try{
    const suggestionType = await SuggestionTypeModel.findOne({ name: name }).exec();
    if (!suggestionType) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Suggestion Type not found.'
        }
      }
    } else {
      serviceResponse.content = suggestionType;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error('Internal Server Error.')
  }
}

SuggestionTypeService.findAll = async () => {
  let serviceResponse = {
    success: true,
    content: {}
  }
  try {
    const suggestionsTypes = await SuggestionTypeModel.find();
    if (!suggestionsTypes) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No suggestion type found.'
        }
      }
    } else {
      serviceResponse.content = suggestionsTypes;
    }

    return serviceResponse
  } catch(error) {
    throw new Error('Internal Server Error.')
  }

}

SuggestionTypeService.findOneById = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const suggestionTypeFound = await SuggestionTypeModel.findById(_id);
    if (!suggestionTypeFound) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Suggestion Type not found.'
        }
      }
    } else {
      serviceResponse.content = suggestionTypeFound;
    }
  
    return serviceResponse;
  } catch(error) {
    throw new Error('Internal Server Error.')
  }
}

SuggestionTypeService.updateOneById = async (suggestionType, newContent) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const updatedSuggestionType = await SuggestionTypeModel.findByIdAndUpdate(suggestionType._id, { ...newContent });
    if (!updatedSuggestionType) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Something went wrong.'
        }
      }
    } else {
      serviceResponse.content = await SuggestionTypeModel.findById(suggestionType._id);
    }

    return serviceResponse;
  } catch(error) {
    throw new Error('Internal Server Error');
  }
}

SuggestionTypeService.remove = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const suggestionsTypeDeleted = await SuggestionTypeModel.findByIdAndDelete(_id).exec();
    if (!suggestionsTypeDeleted) {
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

module.exports = SuggestionTypeService;