//const config = require('config.json');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Vehicle = db.Vehicle;
const Locations = db.Location;

module.exports={
    authenticate,
    getAll,
    getById,
    getByLocation,
    getByCarIdAndLocaiton,
    create,
    update,
    delete: _delete
};

async function authenticate() {
    
}

async function getAll() {
    return await Vehicle.find();
}

async function getById(id) {
    return await Vehicle.findById(id);
}

async function getByLocation(location) {
    return await Vehicle.find({ companyLocation: location });
}

async function getByCarIdAndLocaiton(location, carId) {
    return await Vehicle.find({ companyLocation: location , carID: carId });
}

async function create(vehicleParam) {

    const vehicle = new Vehicle(vehicleParam);

    await vehicle.save();

    const location = await Locations.findOne({ locationName: vehicleParam.companyLocation });

    location.vehicles.push(vehicle._id);

    await location.save();

}

async function update(id, vehicleParam) {
    const vehicle = await Vehicle.findById(id);

    if(!vehicle) throw 'Vehicle not found';

    Object.assign(vehicle, vehicleParam);

    await vehicle.save();
}

async function _delete(id) {
    await Vehicle.findByIdAndRemove(id);
}