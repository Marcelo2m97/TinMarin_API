const SuggestionTypeService = require('./../../../services/SuggestionType');
const { verifyId } = require('./../../../utils/MongoUtils');

const SuggestionTypeController = {}

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