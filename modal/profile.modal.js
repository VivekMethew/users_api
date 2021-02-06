const mongoose = require('mongoose');
const Schema = mongoose.Schema


const profileShema = new Schema({
    url: {
        type: String,
        required: true
    }
})

const Profile = mongoose.model('profile', profileShema)

module.exports = { Profile }