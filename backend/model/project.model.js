const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    projectTitle: String,
    aboutProject: String,
    projectLink: String,
    projectImg: String,
    public_id: String,

})

module.exports = mongoose.model("project", projectSchema);