const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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