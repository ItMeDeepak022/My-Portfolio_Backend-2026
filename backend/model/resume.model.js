const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
    resumeLetter: String,
    resumeTitle: String,
    Description:String,
    uploadDate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('resume', resumeSchema)