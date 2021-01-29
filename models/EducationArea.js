
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *  EducationAreaSchema es un modelo utilizado para guardar los áreas de educación a las que pueden pertenecer
 *  las exhibiciones del museo. Este modelo fue creado con el fin de poder mostrar en un dropdown box menu al
 *  momento de crear una nueva exhibición. Sin embargo no es el objeto el que se almacena en la exhibición, sino
 *  la cadena de texto que este objeto provee.
 *  Este modelo solo está compuesto por el nombre del área de educación, sin embargo al momento de ser creado
 *  también son incluídos campos como su id en la base de datos, fecha de creación y fecha de modificación.
 */
const EducationAreaSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("EducationArea", EducationAreaSchema);