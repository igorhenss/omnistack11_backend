const knex = require('knex');

const config = require('../../knexfile');

const connProfile = process.env.NODE_ENV === 'test' ? config.test : config.development;

const connection = knex(connProfile);

module.exports = connection;