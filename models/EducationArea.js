const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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