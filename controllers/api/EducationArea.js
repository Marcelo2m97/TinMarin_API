const EducationAreaService = require('./../../services/EducationArea');

const EducationAreaController = {};

EducationAreaController.create = async (req, res) => {
  const educationAreaVerified = EducationAreaService.verifyFields(req.body);
  if (!educationAreaVerified.success) {
    return res.status(400).json(educationAreaVerified.content);
  }

  try {
    const educationAreaSaved = await EducationAreaService.create(req.body);
    if (!educationAreaSaved.success) {
      return res.status(409).json(educationAreaSaved.content);
    }

    return res.status(201).json(educationAreaSaved.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

EducationAreaController.findAll = async (req, res) => {
  try {
    const educationAreas = await EducationAreaService.findAll();
    if (!educationAreas.success) {
      return res.status(404).json(educationAreas.content);
    }

    return res.status(200).json(educationAreas.content);
  } catch(error) {
    return res.status(500).json({
      error: 'Internal Server Error.'
    })
  }
}

module.exports = EducationAreaController;