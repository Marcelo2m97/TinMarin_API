const RecommendationModel = require('./../models/Recommendation');

const RecommendationService = {};

RecommendationService.verifyContent = ({ title, description, steps, source, image }) => {
  let serviceResponse = {
    success: true,
    content: {}
  };

  if (!title || !description || !steps || !source || !image) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing required field.'
      }
    };
  }

  return serviceResponse;
}

RecommendationService.verifyUpdate = ({ title, description, steps, source, image }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  if (!title && !description && !steps&& !source && !image) {
    serviceResponse = {
      success: false,
      content: {
        error: 'No changes to make.'
      }
    }

    return serviceResponse;
  }

  if (title) serviceResponse.content.title = title;
  if (description) serviceResponse.content.description = description;
  if (source) serviceResponse.content.source = source;
  if (image) serviceResponse.content.image = image;

  return serviceResponse;
}

RecommendationService.create = async ({ title, description, steps, source, image }) => {
  let serviceResponse = {
    success: true,
    content: {}
  };

  const recommendation = new RecommendationModel({
    title,
    description,
    steps,
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

RecommendationService.findByTitle = async ({ title }) => {
  let serviceResponse = {
    success: true,
    content: {}
  };

  try {
    const recommendation = await RecommendationModel.findOne({ title: title }).exec();
    if (!recommendation) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Recommendation not found.'
        }
      }
    } else {
      serviceResponse.content = recommendation;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error("Internal Server Error.");
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

RecommendationService.updateOneById = async (recommendation, newContent) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const updatedRecommendation = await RecommendationModel.findByIdAndUpdate(recommendation._id, { ...newContent })
    if (!updatedRecommendation) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Something went wrong.'
        }
      }
    } else {
      serviceResponse.content = await RecommendationModel.findById(recommendation._id);
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