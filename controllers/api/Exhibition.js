const Exhibition = require('../../models/Exhibition');
const ExhibitionService = require('./../../services/Exhibition');

const ExhibitionController = {};

ExhibitionController.addNewExhibition = async (req, res) => {
  const fieldsValidation = ExhibitionService.verifyFields(req.body);

  if (!fieldsValidation.success) {
    return res.status(400).json(fieldsValidation.content);
  }

  try {
    const exhibitionCreated = await ExhibitionService.create(req.body);

    if (!exhibitionCreated.success) {
      return res.status(409).json(exhibitionCreated.content);
    }

    return res.status(201).json(exhibitionCreated.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

ExhibitionController.findAll = async (req, res) => {
  try{
    const exhibitionsFound = await ExhibitionService.getAll();
  
    if (!exhibitionsFound.success) {
      return res.status(404).json(exhibitionsFound.content);
    }
  
    return res.status(200).json(exhibitionsFound.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

ExhibitionController.findOneById = async (req, res) => {
  const { _id } = req.params;

  try {
    const exhibitionFound = await ExhibitionService.findOneById(_id);
    if (!exhibitionFound.success) {
      return res.status(404).json(exhibitionFound.content);
    }

    return res.status(200).json(exhibitionFound.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error'
    });
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
      return res.status(409).json(exhibitionDeleted.content);
    }

    return res.status(204).json(exhibitionDeleted.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    });
  }
}

module.exports = ExhibitionController;