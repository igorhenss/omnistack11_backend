const express = require('express');
const routes = express.Router();

const SessionController = require('./controller/SessionController');
const NgoController = require('./controller/NgoController');
const CauseController = require('./controller/CauseController');
const ProfileController = require('./controller/ProfileController');

routes.post('/sessions', SessionController.create);

routes.get('/ngo', NgoController.readAll);
routes.post('/ngo/register', NgoController.create);

routes.get('/cause', CauseController.readAll);
routes.post('/cause/register', CauseController.create);
routes.delete('/cause/:id/delete', CauseController.delete);

routes.get('/profile', ProfileController.readAll);

module.exports = routes;