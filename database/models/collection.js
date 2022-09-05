const {Model} = require('objection');
const knex = require('../config/database');
const CollectionItem = require('./collectionitem');

Model.knex(knex);

module.exports = class Collection extends Model {
    static get tableName() {
        return 'collections';
    }

    static relationMappings = {
        collection_items: {
          relation: Model.HasManyRelation,
          modelClass: CollectionItem,
          join: {
            from: 'collections.id',
            to: 'collection_items.collection_id'
          }
        }
      };
};
