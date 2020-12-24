const RecommendedWebsiteModel = require('./../models/RecommendedWebsite');

const RecommendedWebsiteService = {};

RecommendedWebsiteService.verifyFields = ({ url, image, title }) => {
  let serviceResponse = {
    success: true,
    content: {}
  };

  if (!url || !image || !title) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing required fields. Request must have the url of the website or article, an image and a title for the website or article.'
      }
    }
  }

  return serviceResponse;

}

RecommendedWebsiteService.create = async ({ url, image, title }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  const recommendedWebsite = new RecommendedWebsiteModel({
    url,
    image,
    title
  });
  try {
    const recommendedWebsiteSaved = await recommendedWebsite.save();
    if (!recommendedWebsiteSaved) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Recommended Website could not be created.'
        }
      }
    } else {
      serviceResponse.content = recommendedWebsiteSaved;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error(error);
  }
}

module.exports = RecommendedWebsiteService;
