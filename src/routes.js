const express = require('express');
const routes = express.Router();

const SessionController = require('./controller/SessionController');
const NgoController = require('./controller/NgoController');
const CauseController = require('./controller/CauseController');
const ProfileController = require('./controller/ProfileController');

routes.post('/sessions', SessionController.create);

routes.get('/ngos', NgoController.readAll);
routes.post('/ngo/register', NgoController.create);

routes.get('/causes', CauseController.readAll);
routes.post('/cause/new', CauseController.create);
routes.delete('/cause/delete/:id', CauseController.delete);

routes.get('/profile', ProfileController.readAll);

module.exports = routes;