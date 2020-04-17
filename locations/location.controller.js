const express = require('express');
const router = express.Router();
const locationService = require('./location.service');

// routes - locations
router.post('/authenticate', authenticateLocation);
router.post('/register', registerLocation);
router.get('/', getAllLocations);
router.get('/all', getAllLocationsWithVehicles);
router.get('/current', getCurrentLocation);
router.get('/:id', getLocationById);
router.put('/:id', updateLocation);
router.delete('/:id', _deleteLocation);


module.exports = router;


// location functions
function authenticateLocation(req, res, next) {
    locationService.authenticate(req.body)
        .then(location => location ? res.json(location) : res.status(400).json({ message: 'Location is incorrect' }))
        .catch(err => next(err));
}

function registerLocation(req, res, next) {
    locationService.createLocation(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllLocations(req, res, next) {
    locationService.getAll()
        .then(locations => res.json(locations))
        .catch(err => next(err));
}

function getAllLocationsWithVehicles(req, res, next) {
    locationService.getAllWithVehicles()
        .then(locations => res.json(locations))
        .catch(err => next(err));
}

function getCurrentLocation(req, res, next) {
    locationService.getById(req.location.sub)
        .then(location => location ? res.json(location) : res.sendStatus(404))
        .catch(err => next(err));
}

function getLocationById(req, res, next) {
    locationService.getById(req.params.id)
        .then(location => location ? res.json(location) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateLocation(req, res, next) {
    locationService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .cathc(err => next(err));
}

function _deleteLocation(req, res, next) {
    locationService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

