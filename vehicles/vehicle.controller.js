const express = require('express');
const router = express.Router();
const vehicleService = require('./vehicle.service');

// routes - vehicles
router.post('/register', registerVehicle);
router.get('/', getAllVehicles);
router.get('/location/:location', getAllVehiclesFromLocation);
router.get('/current', getCurrentVehicle);
router.get('/specific/:location/:carId', getVehicleByCarId);
router.get('/:id', getVehicleById);
router.put('/:id', updateVehicle);
router.delete('/:id', _deleteVehicle);

module.exports = router;

// vehicle functions
function registerVehicle(req, res, next) {
    vehicleService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllVehicles(req, res, next) {
    vehicleService.getAll()
        .then(vehicles => res.json(vehicles))
        .catch(err => next(err));
}

function getAllVehiclesFromLocation(req, res, next) {
    const location = req.params.location;
    vehicleService.getByLocation(location)
        .then(vehicles => res.json(vehicles))
        .catch(err => next(err));
}

function getCurrentVehicle(req, res, next) {
    vehicleService.getById(req.vehicle.sub)
        .then(vehicle => vehicle ? res.json(vehicle) : res.sendStatus(404))
        .catch(err => next(err));
}

function getVehicleById(req, res, next) {
    vehicleService.getById(req.params.id)
        .then(vehicle => vehicle ? res.json(vehicle) : res.sendStatus(404))
        .catch(err => next(err));
}

function getVehicleByCarId(req, res, next) {
    const location = req.params.location;
    const carId = req.params.carId;
    vehicleService.getByCarIdAndLocaiton(location, carId)
        .then(vehicle => vehicle ? res.json(vehicle) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateVehicle(req, res, next) {
    vehicleService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteVehicle(req, res, next) {
    vehicleService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
