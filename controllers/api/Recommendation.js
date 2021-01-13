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
      return res.status(503).content(recommendationCreated.content);
    }
    return res.status(201).json(recommendationCreated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

RecommendationController.findAll = async (req, res) => {
  try {
    const recommendations = await RecommendationService.findAll();
    if (!recommendations.success) {
      return res.status(404).json(recommendations.content);
    }

    return res.status(200).json(recommendations.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

RecommendationController.remove = async (req, res) => {
  try {
    const recommendation = await RecommendationService.findOneById(req.params._id);
    if (!recommendation.success) {
      return res.status(404).json(recommendation.content);
    }
    const recommendationDeleted = await RecommendationService.remove(req.params._id);
    if (!recommendationDeleted.success) {
      return res.status(503).json(recommendationDeleted.content);
    }

    return res.status(204).json(recommendationDeleted.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}
module.exports = RecommendationController;