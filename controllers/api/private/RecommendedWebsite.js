const RecommendedWebsiteService = require('./../../../services/RecommendedWebsite');
const { verifyId } = require('./../../../utils/MongoUtils');

const RecommendedWebsiteController = {};

RecommendedWebsiteController.create = async (req, res) => {
  const recommendedWebsiteVerified = RecommendedWebsiteService.verifyFields(req.body);
  if (!recommendedWebsiteVerified.success) {
    return res.status(400).json(recommendedWebsiteVerified.content);
  }

  try {
    const recommendedWebsiteSaved = await RecommendedWebsiteService.create(req.body);
    if (!recommendedWebsiteSaved.success) {
      return res.status(503).json(recommendedWebsiteSaved.content);
    }
    return res.status(201).json(recommendedWebsiteSaved.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

RecommendedWebsiteController.update = async (req, res) => {
  const { _id } = req.params;

  if (!verifyId(_id)) {
    return res.status(400).json({
      error: 'Invalid id.'
    });
  }

  const verifiedFields = RecommendedWebsiteService.verifyUpdate(req.body);

  if (!verifiedFields.success) {
    return res.status(400).json(verifiedFields.content);
  }

  try {
    const RecommendedWebsiteExists = await RecommendedWebsiteService.findOneById(_id);
    if (!RecommendedWebsiteExists.success) {
      return res.status(404).json(RecommendedWebsiteExists.content);
    }

    const RecommendedWebsiteUpdated = await RecommendedWebsiteService.updateOneById(RecommendedWebsiteExists.content, verifiedFields.content);
    if (!RecommendedWebsiteUpdated.success) {
      return res.status(503).json(RecommendedWebsiteUpdated.content);
    }

    return res.status(200).json(RecommendedWebsiteUpdated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

RecommendedWebsiteController.remove = async (req, res) => {
  try {
    const recommendedWebsite = await RecommendedWebsiteService.findOneById(req.params._id);
    if (!recommendedWebsite.success) {
      return res.status(404).json(recommendedWebsite.content);
    }
    const recommendedWebsiteDeleted = await RecommendedWebsiteService.remove(req.params._id);
    if (!recommendedWebsiteDeleted.success) {
      return res.status(503).json(recommendedWebsiteDeleted.content);
    }

    return res.status(204).json(recommendedWebsiteDeleted.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

module.exports = RecommendedWebsiteController;