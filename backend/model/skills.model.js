const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    skill: String,
    level: String,
    Description:String
})

module.exports = mongoose.model("skill", skillSchema);