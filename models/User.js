const Crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *  UserSchema es un modelo para el manejo de los usuarios que podrán manipular los datos de la base de datos.
 *  Este modelo esta compuesto por el nombre de usuario y la contraseña del usuario.
 *  Al momento de ser creado también son incluídos campos como su id en la base de datos, fecha de creación y fecha 
 *  de modificación.
 */
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

UserSchema
    .virtual("password")
    .set(function(password) {
        this.hashedPassword = Crypto.createHmac("sha256", password).digest("hex");
    });

UserSchema.methods = {
    comparePassword: function (password) {
        return (Crypto.createHmac("sha256", password).digest("hex") === this.hashedPassword)
    }
}

module.exports = mongoose.model('User', UserSchema);