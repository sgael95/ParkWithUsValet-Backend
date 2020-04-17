const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    locationName: { type: String, unique: true, required: true },
    address: { type: String, unique: true, required: true },
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'vehicle'}]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('location', schema);