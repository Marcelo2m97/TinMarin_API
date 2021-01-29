const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *  ExhibitionSchema es el modelo utilizado para representar los exhibiciones del museo. Este modelo está compuesto
 *  por su nombre, su nombre en minúsculas, la descripción de la exhibición, el link de las imágenes almacenadas en
 *  firebase, el promedio de rating que tiene la aplicación, los nombres de los patrocinadores de la exhibición,
 *  las imágenes de los patrocinadores, las áreas de educación que cubre la exhibición, la edad mínima y máxima para
 *  interactuar con la exhibición en el museo, el tiempo de interacción que se tiene con la exhibición, la capacidad 
 *  de personas que pueden interactuar con la exhibición simultaneamente (sin tomar en cuenta el COVID-19) y un dato
 *  curioso de exhibición si es que lo hay.
 *  Al momento de ser creado también son incluídos campos como su id en la base de datos, fecha de creación y fecha 
 *  de modificación.
 */
const ExhibitionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    lowercaseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    rating: Number,
    sponsorName: [{
        type: String,
        default: ""
    }],
    sponsorLogo: [String],
    educationArea: [String],
    minimumAge: {
        type: Number,
        default: 0
    },
    maximumAge: {
        type: Number,
        default: 17
    },
    duration: Number,
    capacity: Number,
    curiousInfo: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Exhibition", ExhibitionSchema);