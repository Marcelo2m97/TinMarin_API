const RecommendationService = require('./../../services/Recommendation');

const RecommendationController = {};

RecommendationController.create = async (req, res) => {
  const recommendationValidated = RecommendationService.verifyContent(req.body);
  if (!recommendationValidated.success) {
    return res.status(400).json(recommendationValidated.content);
  }
  try {
    const recommendationCreated = await RecommendationService.create(req.body);
    if (!recommendationCreated.success) {
      return res.status(409).content(recommendationCreated.content);
    }
    return res.status(201).json(recommendationCreated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

module.exports = RecommendationController;