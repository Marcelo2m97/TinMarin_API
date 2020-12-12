const SuggestionTypeService = require('./../../services/SuggestionType');

const SuggestionTypeController = {}

SuggestionTypeController.create = async (req, res) => {
  const suggestionTypeValidated = SuggestionTypeService.verifyFields(req.body);
  if (!suggestionTypeValidated.success) {
    return res.status(400).json(suggestionTypeValidated.content);
  }

  const suggestionTypeCreated = await SuggestionTypeService.create(req.body);
  if (!suggestionTypeCreated.success) {
    return res.status(409).json(suggestionTypeCreated.content);
  }

  return res.status(201).json(suggestionTypeCreated.content);
}

module.exports = SuggestionTypeController;