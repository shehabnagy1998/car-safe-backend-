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
    engine_no: {
        type: String,
        required: true,
    },
    vin_no: {
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
})

car_lostSchema.statics.getAll = function () {
    return this.find({})
}

car_lostSchema.statics.delete = function (id) {
    return this.findByIdAndRemove(id)
}

module.exports = mongoose.model('car_losts', car_lostSchema)