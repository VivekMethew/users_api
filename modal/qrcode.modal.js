const mongoose = require('mongoose');
const Schema = mongoose.Schema


const qrcodeShema = new Schema({
    userid: {
        type: String,
        unique: true,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

const QrCodes = mongoose.model('qrocdes', qrcodeShema)

module.exports = { QrCodes }