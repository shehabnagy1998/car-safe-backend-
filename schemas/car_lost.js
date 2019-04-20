const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const car_lostSchema = new Schema({
    reportID: {
        type: String,
        required: true,
        unique: true
    },
    lic_pla_num: {
        type: Number,
        required: true,
    },
    lic_pla_let: {
        type: String,
        required: true,
        uppercase: true
    },
    address: {
        type: String,
        required: true,
    },
    engine_no: {
        type: String,
        required: true,
        unique: true
    },
    vin_no: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true,
    },
    color: {
        type: String,
        required: true,
        uppercase: true
    },
    brand: {
        type: String,
        required: true,
        uppercase: true
    },

})

module.exports = mongoose.model('car_lost', car_lostSchema)