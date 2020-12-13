const SuggestionModel = require('./../models/Suggestion');

const SuggestionService = {}

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

module.exports = SuggestionService