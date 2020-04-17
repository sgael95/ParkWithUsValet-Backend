//const config = require('config.json');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Location = db.Location;

module.exports = {
    authenticate,
    getAll,
    getAllWithVehicles,
    getById,
    createLocation,
    update,
    delete: _delete
};

async function authenticate() {
    
}

async function getAll() {
    return await Location.find();
}

async function getAllWithVehicles() {
    return await Location.find().populate('vehicles');
}

async function getById(id) {
    return await Location.findById(id);
}

async function createLocation(locationParam) {

    if (await Location.findOne({ locationName: locationParam.locationName })) {
        throw 'Location not valid';
    }

    const location = new Location(locationParam);

    await location.save();
}

async function update(id, locationParam) {
    const location = await Location.findById(id);

    if(!location) throw 'Location not found';

    Object.assign(location, locationParam);

    await location.save();
}

async function _delete(id) {
    await Location.findByIdAndRemove(id);
}