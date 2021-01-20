const ExhibitionService = require('./../../../services/Exhibition');
const { verifyId } = require('./../../../utils/MongoUtils');

const ExhibitionController = {};

ExhibitionController.addNewExhibition = async (req, res) => {
  const fieldsValidation = ExhibitionService.verifyFields(req.body);

  if (!fieldsValidation.success) {
    return res.status(400).json(fieldsValidation.content);
  }

  try {
    const exhibitionExists = await ExhibitionService.findOneByName(req.body);
    if (exhibitionExists.success) {
      return res.status(403).json({
        error: 'Exhibition with indicated name already exists.'
      });
    }
    
    const exhibitionCreated = await ExhibitionService.create(req.body);

    if (!exhibitionCreated.success) {
      return res.status(503).json(exhibitionCreated.content);
    }

    return res.status(201).json(exhibitionCreated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

ExhibitionController.update = async (req, res) => {
  const { _id } = req.params;

  if (!verifyId(_id)) {
    return res.status(400).json({
      error: 'Invalid id.'
    });
  }

  const verifiedFields = ExhibitionService.verifyUpdate(req.body);

  if (!verifiedFields.success) {
    return res.status(400).json(verifiedFields.content);
  }

  try {
    const exhibitionExists = await ExhibitionService.findOneById(_id);
    if (!exhibitionExists.success) {
      return res.status(404).json(exhibitionExists.content);
    }

    const exhibitionUpdated = await ExhibitionService.updateOneById(exhibitionExists.content, verifiedFields.content);
    if (!exhibitionUpdated.success) {
      return res.status(503).json(exhibitionUpdated.content);
    }

    return res.status(200).json(exhibitionUpdated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

ExhibitionController.remove = async (req, res) => {
  try {
    const exhibition = await ExhibitionService.findOneById(req.params._id);
    if (!exhibition.success) {
      return res.status(404).json(exhibition.content);
    }
    const exhibitionDeleted = await ExhibitionService.remove(req.params._id);
    if (!exhibitionDeleted.success) {
      return res.status(503).json(exhibitionDeleted.content);
    }

    return res.status(204).json(exhibitionDeleted.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

module.exports = ExhibitionController;