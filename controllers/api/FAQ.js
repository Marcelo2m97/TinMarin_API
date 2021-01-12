const FAQService = require('./../../services/FAQ');

const FAQController = {};

FAQController.create = async (req, res) => {
  const FAQVerified = FAQService.verifyFields(req.body);
  if (!FAQVerified.success) {
    return res.status(400).json(FAQVerified.content);
  }
  try {
    const FAQSaved = await FAQService.create(req.body);
    if (!FAQSaved.success) {
      return res.status(409).json(FAQSaved.content);
    }

    return res.status(201).json(FAQSaved.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

FAQController.findAll = async (req, res) => {
  try {
    const faqs = await FAQService.findAll();
    if (!faqs.success) {
      return res.status(404).json(faqs.content);
    }

    return res.status(200).json(faqs.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

FAQController.remove = async (req, res) => {
  try {
    const faq = await FAQService.findOneById(req.params._id);
    if (!faq.success) {
      return res.status(404).json(faq.content);
    }
    const faqDeleted = await FAQService.remove(req.params._id);
    if (!faqDeleted.success) {
      return res.status(409).json(faqDeleted.content);
    }

    return res.status(204).json(faqDeleted.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

module.exports = FAQController;