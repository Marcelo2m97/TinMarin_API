const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *  RecommendationWebsiteSchema es un modelo utilizado para guardar y mostrar los artículos que el museo cree que
 *  pueden ser de interés frente a la pandemia para sus usuarios y que estos se informen más sobre cómo cuidar su
 *  salud. Este comodelo esta compuesto por la url del artículo, la imagen de la organización que hizo el artículo
 *  y título del artículo.
 *  Al momento de ser creado también son incluídos campos como su id en la base de datos, fecha de creación y fecha 
 *  de modificación.
 */
const RecommendedWebsiteSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "default.jpg"
    },
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("RecommendedWebsite", RecommendedWebsiteSchema);