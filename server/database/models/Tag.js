const {Model} = require('objection');
const knex = require('../config/database')

Model.knex(knex);

module.exports = class Tag extends Model {
    static get tableName() {
        return 'tags';
    }
};
