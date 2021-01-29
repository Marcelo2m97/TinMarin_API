const FAQModel = require('./../models/FAQ');

/**
 * Este objeto contiene las funciones del servicio de preguntas frecuentes.
 */
const FAQService = {};

/**
 * 
 * @function
 * @param {string} question
 * @param {string} answer
 * @returns {Object} Si la verificación es correcta returna verdadero en el elemento 'success' y falso en caso contrario.
 */
FAQService.verifyFields = ({ question, answer }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  if (!question || !answer) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing one of the required fields. Request needs an answer and a question.'
      }
    }

    return serviceResponse;
  }

  return serviceResponse;
}

/**
 * 
 * @function
 * @param {string} question
 * @param {string} answer
 * @returns {Object} Si la verificación es correcta returna verdadero en el elemento 'success' y falso en caso contrario.
 */
FAQService.verifyUpdate = ({ question, answer }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  if (!question && !answer) {
    serviceResponse = {
      success: false,
      content: {
        error: 'No changes to make.'
      }
    }

    return serviceResponse;
  }

  if (question) serviceResponse.content.question = question;
  if (answer) serviceResponse.content.answer = answer;

  return serviceResponse;
}

/**
 * 
 * @async
 * @function
 * @param {string} question
 * @param {string} answer
 * @returns {Object} La pregunta frecuente creada.
 */
FAQService.create = async ({ question, answer}) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  const faq = new FAQModel({
    question,
    answer
  });
  try {
    const faqSaved = await faq.save();
    if (!faqSaved) {
      serviceResponse = {
        success: true,
        content: {
          error: 'FAQ could not be saved.'
        }
      };
    } else {
      serviceResponse.content = faqSaved;
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
 * @param {string} question
 * @returns {Object} La pregunta frecuente con pregunta especificada.
 */
FAQService.findByQuestion = async ({ question }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const faq = await FAQModel.findOne({ question: question }).exec();
    if (!faq) {
      serviceResponse = {
        success: false,
        content: {
          error: 'FAQ not found.'
        }
      }
    } else {
      serviceResponse.content = faq;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error("Internal Server Error.");
  }
}

/**
 * 
 * @async
 * @function
 * @returns {Array} Lista con las preguntas frecuentes existentes
 */
FAQService.findAll = async () => {
  let serviceResponse = {
    success: true,
    content: {}
  }
  try {
    const faqs = await FAQModel.find();
    if (!faqs) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No FAQs found.'
        }
      }
    } else {
      serviceResponse.content = faqs;
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
 * @returns {Object} La pregunta frecuente con el _id especificado.
 */
FAQService.findOneById = async (_id) => {
  let serviceResponse = {
      success: true,
      content: {}
  }

  try {
      const faq = await FAQModel.findOne({ _id: _id }).exec();
      if (!faq) {
          serviceResponse = {
              success: false,
              content: {
                  error: 'Exhibition not found.'
              }
          }
      } else {
          serviceResponse.content = faq;
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
 * @param {object} faq
 * @param {object} newContent
 * @returns {object} La pregunta frecuente actualizada.
 */
FAQService.updateOneById = async (faq, newContent) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  try {
    const updatedFaq = await FAQModel.findByIdAndUpdate(faq._id, { ...newContent });
    if (!updatedFaq) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Something went wrong.'
        }
      }
    } else {
      serviceResponse.content = await FAQModel.findById(faq._id).exec();
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
FAQService.remove = async (_id) => {
  let serviceResponse = {
      success: true,
      content: {}
  }

  try {
      const faqDeleted = await FAQModel.findByIdAndDelete(_id).exec();
      if (!faqDeleted) {
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

module.exports = FAQService;