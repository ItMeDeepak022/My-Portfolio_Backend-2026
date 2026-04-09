const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
    companyName: String,
    internPosition: String,
    internImg: String
})

module.exports = mongoose.model("internship", internshipSchema);