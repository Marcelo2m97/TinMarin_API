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

module.exports = ExhibitionController;