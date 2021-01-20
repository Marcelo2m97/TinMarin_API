const RecommendationService = require('./../../../services/Recommendation');
const { verifyId } = require('./../../../utils/MongoUtils');

const RecommendationController = {};

RecommendationController.create = async (req, res) => {
  const recommendationValidated = RecommendationService.verifyContent(req.body);
  if (!recommendationValidated.success) {
    return res.status(400).json(recommendationValidated.content);
  }
  try {
    const recommendationExists = await RecommendationService.findByTitle(req.body);
    if (recommendationExists.success) {
      return res.status(403).json({
        error: 'Recommendation with indicated title already exists.'
      });
    }
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

RecommendationController.update = async (req, res) => {
  const { _id } = req.params;

  if (!verifyId(_id)) {
    return res.status(400).json({
      error: 'Invalid id.'
    });
  }

  const verifiedFields = RecommendationService.verifyUpdate(req.body);

  if (!verifiedFields.success) {
    return res.status(400).json(verifiedFields.content);
  }

  try {
    const RecommendationExists = await RecommendationService.findOneById(_id);
    if (!RecommendationExists.success) {
      return res.status(404).json(RecommendationExists.content);
    }

    const RecommendationUpdated = await RecommendationService.updateOneById(RecommendationExists.content, verifiedFields.content);
    if (!RecommendationUpdated.success) {
      return res.status(503).json(RecommendationUpdated.content);
    }

    return res.status(200).json(RecommendationUpdated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
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