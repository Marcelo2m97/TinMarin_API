const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *  SuggestionTypeSchema es un modelo utilizado para almacenar los tipos de sugerencia que puede hacer un usuario.
 *  La principal función de este modelo es mostrar en un dropdown box menu los tipos de sugerencia que el usuario
 *  puede realizar, para que este escoja el que más se ajusta a la sugerencia que quiere dar.
 *  Este modelo esta compuesto por el nombre del tipo de sugerencia.
 *  Al momento de ser creado también son incluídos campos como su id en la base de datos, fecha de creación y fecha 
 *  de modificación.
 */
const SuggestionTypeSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("SuggestionType", SuggestionTypeSchema);