const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
    carID: { type: Number, unique: false, required: true },
    vin: { type: String, unique: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: false },
    color: { type: String, required: true },
    location: { type: String, required: false },
    companyLocation: { type: String, required: true }
});

schema.set('toJson', { virtuals: true });

module.exports = mongoose.model('vehicle', schema);