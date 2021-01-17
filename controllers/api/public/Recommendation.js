const RecommendationService = require('./../../../services/Recommendation');

const RecommendationController = {};

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

module.exports = RecommendationController;