const ExhibitionModel = require('./../models/Exhibition');

const ExhibitionService = {};

ExhibitionService.verifyFields = ({ name, description, images, sponsorName, educationArea, minimunAge, maximumAge }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: ""
        }
    }

    if (!name || !description || !images || !sponsorName || !educationArea || !minimunAge || !maximumAge) {
        serviceResponse = {
            success: false,
            content: {
                error: "Missing required fields."
            }
        }
    }

    return serviceResponse
}

ExhibitionService.create = async ({ name, description, images, sponsorName, sponsorLogo, educationArea, minimunAge, maximumAge }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Exhibition created successfully."
        }
    }

    try {
        const newExhibition = new ExhibitionModel({
            name,
            description,
            images,
            sponsorName,
            sponsorLogo,
            educationArea,
            minimunAge,
            maximumAge
        });

        const newExhibitionWasCreated = await newExhibition.save();
        if (!newExhibitionWasCreated) {
            serviceResponse = {
                success: false,
                content: {
                    error: "Exhibition could not be created."
                }
            }
        }

        return serviceResponse;
    } catch(error) {
        throw new Error("Internal Server Error.")
    }
}

module.exports = ExhibitionService;