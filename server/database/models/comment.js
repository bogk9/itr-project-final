const {Model} = require('objection');
const knex = require('../config/database')

Model.knex(knex);

module.exports = class Comment extends Model {
    static get tableName() {
        return 'comments';
    }
};
