const Crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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