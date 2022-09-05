const {Model} = require('objection');
const knex = require('../config/database')

Model.knex(knex);

module.exports = class User extends Model {
    static get tableName() {
        return 'users';
    }
};
