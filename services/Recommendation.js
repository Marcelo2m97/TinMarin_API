const RecommendationModel = require('./../models/Recommendation');

const RecommendationService = {};

RecommendationService.verifyContent = ({ title, description, source, image }) => {
  let serviceResponse = {
    success: true,
    content: {}
  };

  if (!title || !description || !source || !image) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing required field.'
      }
    };
  }

  return serviceResponse;
}

RecommendationService.create = async ({ title, description, source, image }) => {
  let serviceResponse = {
    success: true,
    content: {}
  };

  const recommendation = new RecommendationModel({
    title,
    description,
    source,
    image
  });
  try {
    const recommendationSaved = await recommendation.save();
    if (!recommendationSaved) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Recommendation could not be saved.'
        }
      };
    } else {
      serviceResponse.content = recommendationSaved;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error('Internal Server Error.');
  }

}

RecommendationService.findAll = async () => {
  let serviceResponse = {
    success: true,
    content: {}
  };

  try {
    const recommendations = await RecommendationModel.find();
    if (!recommendations) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No recommendations found.'
        }
      };
    } else {
      serviceResponse.content = recommendations;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error('Internal Server Error.');
  }
}

module.exports = RecommendationService;