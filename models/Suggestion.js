const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *  SuggestionSchema es un modelo utilizado para almacenar y mostrar las sugerencias realizadas por los usuarios
 *  al museo, para que este también tenga puntos de partida para realizar mejoras, entre otras cosas.
 *  Este modelo esta compuesto por el tipo de sugerencia y la sugerencia como tal.
 *  Al momento de ser creado también son incluídos campos como su id en la base de datos, fecha de creación y fecha 
 *  de modificación.
 */
const SuggestionSchema = new Schema({
    suggestionType: {
        type: String,
        required: true
    },
    suggestion: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Suggestion", SuggestionSchema);