const {Model} = require('objection');
const knex = require('../config/database');
const CollectionItem = require('./collectionitem');
const Collection = require('./collection');
const Comment = require('./comment');
const FieldData = require('./fielddata')
const ItemTag = require('./itemtag')
const ItemLike = require('./itemlike')

Model.knex(knex);

module.exports = class Item extends Model {
    static get tableName() {
        return 'items';
    }

    static relationMappings = {
        collection_items: {
          relation: Model.HasManyRelation,
          modelClass: CollectionItem,
          join: {
            from: 'items.id',
            to: 'collection_items.item_id'
          }
        },
        field_data: {
          relation: Model.HasManyRelation,
          modelClass: FieldData,
          join: {
            from: 'items.id',
            to: 'field_data.item_id'
          }
        },
        item_tags: {
          relation: Model.HasManyRelation,
          modelClass: ItemTag,
          join: {
            from: 'items.id',
            to: 'item_tags.item_id'
          }
        },
        comments: {
          relation: Model.HasManyRelation,
          modelClass: Comment,
          join: {
            from: 'items.id',
            to: 'comments.item_id'
          }
        },
        likes: {
          relation: Model.HasManyRelation,
          modelClass: ItemLike,
          join: {
            from: 'items.id',
            to: 'item_likes.item_id'
          }
        },
      

      };
};
