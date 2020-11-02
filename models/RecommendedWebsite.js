const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecommendedWebsiteSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "default.jpg"
    },
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("RecommendedWebsite", RecommendedWebsiteSchema);