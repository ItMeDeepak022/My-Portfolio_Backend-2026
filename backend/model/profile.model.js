const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  profileImg: String,
  profileName:String,
  uploadDate: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('profileImg', profileSchema)