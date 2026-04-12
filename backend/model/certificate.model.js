const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({

    certificateTitle: {
        type: String,
        required: true
    },

    certificateImg: {
        type: String,   // image filename
        required: true
    },

    certificatePdf: {
        type: String,   // pdf filename
        required: true
    },
    publicImg_id: String,
    publicPdf_id:String
})

module.exports = mongoose.model("certificate", certificateSchema)