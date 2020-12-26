const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuggestionSchema = new Schema({
    suggestionType: {
        type: String,
        required: true,
        unique: true
    },
    suggestion: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Suggestion", SuggestionSchema);