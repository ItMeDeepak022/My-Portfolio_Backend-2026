let mongoose = require('mongoose')

let authSchema = new mongoose.Schema({
    name: {
        type: String,
        require
    },
    email: {
        type: String,
        require
    },
    password: {
        type: String,
        require
    },
    tokenVersion: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('authentication', authSchema)