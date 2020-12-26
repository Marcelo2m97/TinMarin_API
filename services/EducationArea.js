const EducationArea = require('./../models/EducationArea');
const EducationAreaModel = require('./../models/EducationArea');

const EducationAreaService = {};

EducationAreaService.verifyFields = ({ name }) => {
  let serviceResponse = {
    success: true,
    content: {}
  };

  if (!name) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing name for the education area.'
      }
    }
  }

  return serviceResponse;
}

EducationAreaService.create = async ({ name }) => {
  let serviceResponse = {
    success: true,
    content: {}
  };

  const educationArea = new EducationAreaModel({ name });
  try {
    const educationAreaCreated = await educationArea.save();
    if (!educationAreaCreated) {
      serviceResponse = {
        success: false,
        content: {
          error: 'Education area could not be saved.'
        }
      };
    } else {
      serviceResponse.content = educationAreaCreated;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error(error);
  }
}

EducationAreaService.findAll = async () => {
  let serviceResponse = {
    success: true,
    content: {}
  }
  try {
    const educationAreas = await EducationAreaModel.find();
    if (!educationAreas) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No education area found.'
        }
      };
    } else {
      serviceResponse.content = educationAreas;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error(error);
  }
}

module.exports = EducationAreaService;