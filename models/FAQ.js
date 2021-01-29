const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *  FAQSchema es un modelo utilizado para manejar crear y mostrar un conjunto de preguntas frecuentes realizadas
 *  al museo como podrían ser sus horarios de atención por ejemplo. Este modelo cuenta únicamente con la pregunta
 *  frecuente y su respectiva respuesta. Estas son mostradas en la app para que el usuario no tenga que hacer una
 *  búsqueda más exhaustiva de esta información.
 *  Al momento de ser creado también son incluídos campos como su id en la base de datos, fecha de creación y fecha 
 *  de modificación.
 */
const FAQSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("FAQ", FAQSchema);