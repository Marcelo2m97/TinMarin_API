const SuggestionTypeService = require('./../../services/SuggestionType');

const SuggestionTypeController = {}

SuggestionTypeController.create = async (req, res) => {
  const suggestionTypeValidated = SuggestionTypeService.verifyFields(req.body);
  if (!suggestionTypeValidated.success) {
    return res.status(400).json(suggestionTypeValidated.content);
  }

  try{ 
    const suggestionTypeCreated = await SuggestionTypeService.create(req.body);
    if (!suggestionTypeCreated.success) {
      return res.status(409).json(suggestionTypeCreated.content);
    }
  
    return res.status(201).json(suggestionTypeCreated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

SuggestionTypeController.findAll = async (req, res) => {
  try {
    const suggestionTypes = await SuggestionTypeService.findAll();
    if (!suggestionTypes.success) {
      return res.status(404).json(suggestionTypes.content);
    }

    return res.status(200).json(suggestionTypes.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }

  
}

module.exports = SuggestionTypeController;