const SuggestionTypeModel = require('./../models/SuggestionType');
const { verifyFields } = require('./Exhibition');

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

module.exports = SuggestionTypeService;