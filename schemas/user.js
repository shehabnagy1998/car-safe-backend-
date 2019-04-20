const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    NID: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    government: {
        type: String,
        required: true,
        lowercase: true,
    },
    phone_no: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('user', userSchema)