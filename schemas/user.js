const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,
    },
    government: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('users', userSchema)