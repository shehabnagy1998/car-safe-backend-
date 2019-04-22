const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    colorID: {
        type: String,
        required: true,
        unique: true
    },
    color_name: {
        type: String,
        required: true,
        unique: true
    },
})

module.exports = mongoose.model('colors', colorSchema)