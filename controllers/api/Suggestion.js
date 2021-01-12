const SuggestionService = require('./../../services/Suggestion');

const SuggestionController = {}

SuggestionController.create = async (req, res) => {
  const suggestionValidated = SuggestionService.verifyFields(req.body);
  if (!suggestionValidated.success) {
    return res.status(400).json(suggestionValidated.content);
  }

  try {
    const suggestionCreated = await SuggestionService.create(req.body);
    if (!suggestionCreated.success) {
      return res.status(409).json(suggestionCreated.content);
    }

    return res.status(201).json(suggestionCreated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

SuggestionController.findAll = async (req, res) => {
  try{
    const suggestions = await SuggestionService.findAll();
    if (!suggestions.success) {
      return res.status(404).json(suggestions.content);
    }

    return res.status(200).json(suggestions.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

SuggestionController.remove = async (req, res) => {
  try {
    const suggestion = await SuggestionService.findOneById(req.params._id);
    if (!suggestion.success) {
      return res.status(404).json(suggestion.content);
    }
    const suggestionDeleted = await SuggestionService.remove(req.params._id);
    if (!suggestionDeleted.success) {
      return res.status(409).json(suggestionDeleted.content);
    }

    return res.status(204).json(suggestionDeleted.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

module.exports = SuggestionController;