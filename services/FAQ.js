const FAQModel = require('./../models/FAQ');

const FAQService = {};

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