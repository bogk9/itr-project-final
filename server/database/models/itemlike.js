const {Model} = require('objection');
const knex = require('../config/database')

Model.knex(knex);

module.exports = class ItemLike extends Model {
    static get tableName() {
        return 'item_likes';
    }
};
