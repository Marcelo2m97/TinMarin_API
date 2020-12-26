const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExhibitionRoomSchema = new Schema({
    roomCode: {
        type: Number,
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