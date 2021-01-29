const RecommendedWebsiteModel = require('./../models/RecommendedWebsite');

/**
 * Este objeto contiene las funciones del servicio de sitios web recomendados.
 */
const RecommendedWebsiteService = {};

/**
 * 
 * @function
 * @param {string} url
 * @param {string} images
 * @param {string} title 
 * @returns {Object} Si la verificación es correcta returna verdadero en el elemento 'success' y falso en caso contrario.
 */
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

/**
 * 
 * @function
 * @param {string} url
 * @param {string} images
 * @param {string} title 
 * @returns {Object} Si la verificación es correcta returna verdadero en el elemento 'success' y falso en caso contrario.
 */
RecommendedWebsiteService.verifyUpdate = ({ url, image, title }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  if (!url && !image && !title) {
    serviceResponse = {
      success: false,
      content: {
        error: 'No changes to make.'
      }
    }

    return serviceResponse;
  }

  if (url) serviceResponse.content.url = url;
  if (image) serviceResponse.content.image = image;
  if (title) serviceResponse.content.title = title;

  return serviceResponse;
}

/**
 * 
 * @async
 * @function
 * @param {string} url
 * @param {string} image
 * @param {string} title
 * @returns {Object} El sitio web recomendado creado.
 */
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

/**
 * 
 * @async
 * @function
 * @returns {Array} Lista con los sitios web recomendados existentes
 */
RecommendedWebsiteService.findAll = async () => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const recommendedWebsites = await RecommendedWebsiteModel.find();
    if (!recommendedWebsites) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No recommended websites found'
        }
      };
    } else {
      serviceResponse.content = recommendedWebsites;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error(error);
  }
}

/**
 * 
 * @async
 * @function
 * @param {string} _id
 * @returns {Object} El sitio web recomendado con el _id especificado.
 */
RecommendedWebsiteService.findOneById = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
      const recommendedWebsite = await RecommendedWebsiteModel.findOne({ _id: _id }).exec();
      if (!recommendedWebsite) {
          serviceResponse = {
              success: false,
              content: {
                  error: 'Exhibition not found.'
              }
          }
      } else {
          serviceResponse.content = recommendedWebsite;
      }

      return serviceResponse;
  } catch(error) {
      throw new Error('Internal Server Error');
  }
}

/**
 * 
 * @async
 * @function
 * @param {object} recommendedWebsite
 * @param {object} newContent
 * @returns {object} El sitio web recomendado actualizado.
 */
RecommendedWebsiteService.updateOneById = async (recommendedWebsite, newContent) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const updatedRecommendedWebsite = await RecommendedWebsiteModel.findByIdAndUpdate(recommendedWebsite._id, { ...newContent });
    if (!updatedRecommendedWebsite) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Something went wrong.'
        }
      }
    } else {
      serviceResponse.content = await RecommendedWebsiteModel.findById(recommendedWebsite._id);
    }

    return serviceResponse;
  } catch(error) {
    throw new Error('Internal Server Error');
  }
}

/**
 * 
 * @async
 * @function
 * @param {string} _id 
 * @returns {Array} Lista vacía.
 */
RecommendedWebsiteService.remove = async (_id) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const recommendedWebsiteDeleted = await RecommendedWebsiteModel.findByIdAndDelete(_id).exec();
    if (!recommendedWebsiteDeleted) {
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

module.exports = RecommendedWebsiteService;
