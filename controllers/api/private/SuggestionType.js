const SuggestionTypeService = require('./../../../services/SuggestionType');
const { verifyId } = require('./../../../utils/MongoUtils');

const SuggestionTypeController = {}

SuggestionTypeController.create = async (req, res) => {
  const suggestionTypeValidated = SuggestionTypeService.verifyFields(req.body);
  if (!suggestionTypeValidated.success) {
    return res.status(400).json(suggestionTypeValidated.content);
  }

  try{
    const suggestionTypesExists = await SuggestionTypeService.findOneByName(req.body);
    if (suggestionTypesExists.success) {
      return res.status(403).json({
        error: 'Suggestion type already exists.'
      });
    }
    const suggestionTypeCreated = await SuggestionTypeService.create(req.body);
    if (!suggestionTypeCreated.success) {
      return res.status(503).json(suggestionTypeCreated.content);
    }
  
    return res.status(201).json(suggestionTypeCreated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

SuggestionTypeController.update = async (req, res) => {
  const { _id } = req.params;

  if (!verifyId(_id)) {
    return res.status(400).json({
      error: 'Invalid id.'
    });
  }

  const verifiedFields = SuggestionTypeService.verifyUpdate(req.body);

  if (!verifiedFields.success) {
    return res.status(400).json(verifiedFields.content);
  }

  try {
    const SuggestionTypeExists = await SuggestionTypeService.findOneById(_id);
    if (!SuggestionTypeExists.success) {
      return res.status(404).json(SuggestionTypeExists.content);
    }

    const SuggestionTypeUpdated = await SuggestionTypeService.updateOneById(SuggestionTypeExists.content, verifiedFields.content);
    if (!SuggestionTypeUpdated.success) {
      return res.status(503).json(SuggestionTypeUpdated.content);
    }

    return res.status(200).json(SuggestionTypeUpdated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

SuggestionTypeController.remove = async (req, res) => {
  if (!verifyId(req.params._id)) {
    res.status(400).json({
      error: 'Invalid id.'
    });
  }
  try {
    const suggestionType = await SuggestionTypeService.findOneById(req.params._id);
    if (!suggestionType.success) {
      return res.status(404).json(suggestionType.content);
    }
    const suggestionTypeDeleted = await SuggestionTypeService.remove(req.params._id);
    if (!suggestionTypeDeleted.success) {
      return res.status(503).json(suggestionTypeDeleted);
    }
    return res.status(204).json(suggestionTypeDeleted.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

module.exports = SuggestionTypeController;