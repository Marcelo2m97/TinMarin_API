const ExhibitionService = require('./../../../services/Exhibition');

const ExhibitionController = {};

ExhibitionController.find = async (req, res) => {
  if (!req.query.name) {
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
  } else {
    try {
      const exhibition = await ExhibitionService.findByName(req.query.name);
      if (!exhibition.success) {
        return res.status(404).json(exhibition.content);
      }
  
      return res.status(200).json(exhibition.content);
    } catch(error) {
      res.status(500).json({
        error: 'Internal Server Error.'
      })
    }
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

module.exports = ExhibitionController;