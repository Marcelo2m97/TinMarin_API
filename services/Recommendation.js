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

RecommendationService.findOneById = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
      const recommendation = await RecommendationModel.findOne({ _id: _id }).exec();
      if (!recommendation) {
          serviceResponse = {
              success: false,
              content: {
                  error: 'Exhibition not found.'
              }
          }
      } else {
          serviceResponse.content = recommendation;
      }

      return serviceResponse;
  } catch(error) {
      throw new Error('Internal Server Error');
  }
}

RecommendationService.remove = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const recommendationDeleted = await RecommendationModel.findByIdAndDelete(_id).exec();
    if (!recommendationDeleted) {
        serviceResponse = {
            success: false,
            content: {
                error: 'Something went wrong. Try again later.'
            }
        }
    }

    return serviceResponse;
  } catch(error) {
      throw new Error('Interal Server Error');
  }
}

module.exports = RecommendationService;