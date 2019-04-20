const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    brandID: {
        type: String,
        required: true,
        unique: true
    },
    brand_name: {
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
})

brandSchema.statics.getAll = function () {
    return this.find({})
}

module.exports = mongoose.model('brands', brandSchema)