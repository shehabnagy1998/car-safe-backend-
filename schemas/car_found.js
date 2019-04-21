const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const car_foundSchema = new Schema({
    reportID: {
        type: String,
        required: true,
        unique: true
    },
    lic_pla_num: {
        type: Number,
        required: true,
        unique: true
    },
    lic_pla_let: {
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
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
    userEmail: {
        type: String,
        required: true
    }
});

car_foundSchema.statics.getAll = function () {
    return this.find({})
}

module.exports = mongoose.model('car_founds', car_foundSchema)