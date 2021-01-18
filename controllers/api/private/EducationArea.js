const EducationAreaService = require('./../../../services/EducationArea');
const { verifyId } = require('./../../../utils/MongoUtils');

const EducationAreaController = {};

EducationAreaController.create = async (req, res) => {
  const educationAreaVerified = EducationAreaService.verifyFields(req.body);
  if (!educationAreaVerified.success) {
    return res.status(400).json(educationAreaVerified.content);
  }

  try {
    const educationAreaExists = await EducationAreaService.findOneByName(req.body);
    if (educationAreaExists.success) {
      return res.status(403).json({
        error: 'Education area already exists.'
      })
    }
    
    const educationAreaSaved = await EducationAreaService.create(req.body);
    if (!educationAreaSaved.success) {
      return res.status(503).json(educationAreaSaved.content);
    }

    return res.status(201).json(educationAreaSaved.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

EducationAreaController.remove = async (req, res) => {
  if (!verifyId(req.params._id)) {
    return res.status(400).json({
      error: 'Invalid id.'
    });
  }
  try {
    const educationArea = await EducationAreaService.findOneById(req.params._id);
    if (!educationArea.success) {
      return res.status(404).json(educationArea.content);
    }
    const educationAreaDeleted = await EducationAreaService.remove(req.params._id);
    if (!educationAreaDeleted.success) {
      return res.status(503).json(educationAreaDeleted.content);
    }

    return res.status(204).json(educationAreaDeleted.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

module.exports = EducationAreaController;