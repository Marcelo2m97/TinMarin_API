const RecommendedWebsiteService = require('./../../../services/RecommendedWebsite');

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