const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
*  ExhibitionRoomSchema es un modelo utilizado para crear grupos de exhibiciones seleccionadas para simular
*  una visita al museo enfocandose únicamente en las exhibiciones que se han seleccionado. Es por eso que el
 *  modelo cuenta con un código de cuarto, que será el que los usuarios utilicen para que en la aplicación solo
 *  le sean mostradas las exhibiciones escogidas para ese cuarto. Además el modelo cuenta con una lista de id
 *  que son la referencia de cuáles exhibiciones pertencen al cuarto.
 *  Al momento de ser creado también son incluídos campos como su id en la base de datos, fecha de creación y fecha 
 *  de modificación.
 */
const ExhibitionRoomSchema = new Schema({
    roomCode: {
        type: String,
        required: true,
        unique: true
    },
    exhibitions: [{
        type: mongoose.Schema.Types.ObjectId,
        rel: "Exhibition"
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("ExhibitionRoom", ExhibitionRoomSchema);