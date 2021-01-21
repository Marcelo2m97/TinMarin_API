const FAQService = require('./../../../services/FAQ');
const { verifyId } = require('./../../../utils/MongoUtils');

const FAQController = {};

FAQController.create = async (req, res) => {
  const FAQVerified = FAQService.verifyFields(req.body);
  if (!FAQVerified.success) {
    return res.status(400).json(FAQVerified.content);
  }
  try {
    const FAQExists = await FAQService.findByQuestion(req.body);
    if (FAQExists.success) {
      return res.status(403).json({
        error: 'FAQ with indicated question already exists.'
      })
    }
    const FAQSaved = await FAQService.create(req.body);
    if (!FAQSaved.success) {
      return res.status(503).json(FAQSaved.content);
    }

    return res.status(201).json(FAQSaved.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

FAQController.update = async (req, res) => {
  const { _id } = req.params;

  if (!verifyId(_id)) {
    return res.status(400).json({
      error: 'Invalid id.'
    });
  }

  const verifiedFields = FAQService.verifyUpdate(req.body);

  if (!verifiedFields.success) {
    return res.status(400).json(verifiedFields.content);
  }

  try {
    const FAQExists = await FAQService.findOneById(_id);
    if (!FAQExists.success) {
      return res.status(404).json(FAQExists.content);
    }

    const FAQUpdated = await FAQService.updateOneById(FAQExists.content, verifiedFields.content);
    if (!FAQUpdated.success) {
      return res.status(503).json(FAQUpdated.content);
    }

    return res.status(200).json(FAQUpdated.content);
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
      return res.status(503).json(faqDeleted.content);
    }

    return res.status(204).json(faqDeleted.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

module.exports = FAQController;