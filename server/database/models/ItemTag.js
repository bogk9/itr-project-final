const {Model} = require('objection');
const knex = require('../config/database')
const Tag = require('./Tag');

Model.knex(knex);

module.exports = class ItemTag extends Model {
    static get tableName() {
        return 'item_tags';
    }
    static relationMappings = {
        tag: {
          relation: Model.HasOneRelation,
          modelClass: Tag,
          join: {
            from: 'item_tags.tag_id',
            to: 'tags.id'
          }
        }
      };
};
