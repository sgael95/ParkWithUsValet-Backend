const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

module.exports = {
    User: require('../users/user.model'),
    Location: require('../locations/location.model'),
    Vehicle: require('../vehicles/vehicle.model')
};