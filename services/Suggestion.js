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
    console.log(suggestionSaved);
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

module.exports = SuggestionService