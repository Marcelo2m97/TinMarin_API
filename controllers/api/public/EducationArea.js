const EducationAreaService = require('./../../../services/EducationArea');

const EducationAreaController = {};

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