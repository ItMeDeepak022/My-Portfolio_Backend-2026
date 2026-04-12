const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  profileImg: String,      // Cloudinary URL
  public_id: String,       // 🔥 MUST for delete/update
  profileName: String,
uploadDate: {
    type: Date,
    default: Date.now      // ✅ better way
  }
})

module.exports = mongoose.model('profileImg', profileSchema)