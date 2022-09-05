const {Model} = require('objection');
const knex = require('../config/database')

Model.knex(knex);

module.exports = class Field extends Model {
    static get tableName() {
        return 'fields';
    }
};
