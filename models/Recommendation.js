const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *  RecommendationSchema es un modelo utilizado para que el Tin Marín pueda mostrar ciertas recomendaciones que
 *  quiere hacer llegar a sus usuarios para que estos se cuiden de la panedmia del COVID-19. Este modelo está
 *  compuesto por el título de la recomendación, un arreglo de cadenas de texto para separar los párrafos en
 *  cadenas de texto diferentes, un arreglo de pasos que podrían considerarse si el Tin Marín quiere indicar una
 *  serie de pasos a seguir en su recomendación y la fuente con la que respaldan que la recomendación que hacen
 *  no es invento del museo.
 *  Al momento de ser creado también son incluídos campos como su id en la base de datos, fecha de creación y fecha 
 *  de modificación.
 */
const RecommendationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: [{
        type: String,
        required: true
    }],
    steps: [{
        type: String,
        required: true
    }],
    source: {
        type: String,
        default: "Tin Marín"
    },
    image: {
        type: String,
        default: "default.jpg"
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Recommendation", RecommendationSchema);