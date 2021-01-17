const RecommendedWebsiteService = require('./../../../services/RecommendedWebsite');

const RecommendedWebsiteController = {};

RecommendedWebsiteController.findAll = async (req, res) => {
  try {
    const recommendedWebsites = await RecommendedWebsiteService.findAll();
    if (!recommendedWebsites.success) {
      return res.status(404).json(recommendedWebsites.content);
    }

    return res.status(200).json(recommendedWebsites.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

module.exports = RecommendedWebsiteController;
