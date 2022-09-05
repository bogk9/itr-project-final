const knexfile = require('../../knexfile');
const knex = require('knex');
const env = 'development'

module.exports = knex(knexfile[env]);
