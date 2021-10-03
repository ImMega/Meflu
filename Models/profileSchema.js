const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userID: {type: String, unique: true, required: true},
    mainSkin: {type: Object},
    skins: [String]
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;