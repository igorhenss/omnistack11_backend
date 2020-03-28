const express = require('express');
const routes = express.Router();
const { celebrate, Joi , Segments } = require('celebrate');

const SessionController = require('./controller/SessionController');
const NgoController = require('./controller/NgoController');
const CauseController = require('./controller/CauseController');
const ProfileController = require('./controller/ProfileController');

routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required().length(16)
  })
}), SessionController.create);

routes.get('/ngos', NgoController.readAll);

routes.post('/ngo/register', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().max(160),
    email: Joi.string().required().email().max(160),
    whatsapp: Joi.string().required(),
    city: Joi.string().required(),
    fu: Joi.string().required().length(2)
  })
}), NgoController.create);

routes.get('/causes', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), CauseController.readAll);

routes.post('/cause/new', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().max(160),
    description: Joi.string().required().max(1000),
    value: Joi.number().required().min(1)
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), CauseController.create);

routes.delete('/cause/delete/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), CauseController.delete);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), ProfileController.readAll);

module.exports = routes;