const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const car_foundSchema = new Schema({
    reportID: {
        type: String,
        required: true,
        unique: true
    },
    lic_pla_num: {
        type: String,
        required: true,

    },
    lic_pla_let: {
        type: String,
        required: true,
        uppercase: true,
    },
    phone: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    isMatch: {
        type: Boolean,
        required: true
    },
    loserPhone: {
        type: String
    }
});

module.exports = mongoose.model('car_founds', car_foundSchema)