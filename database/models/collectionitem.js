const {Model} = require('objection');
const knex = require('../config/database');

const Collection = require('./collection');
const Comment = require('./comment');
const FieldData = require('./fielddata')
const ItemTag = require('./itemtag')
const ItemLike = require('./itemlike')
const Item = require('./item');

Model.knex(knex);

module.exports = class CollectionItem extends Model {
    static get tableName() {
        return 'collection_items';
    }

    static relationMappings = {
        item: {
          relation: Model.BelongsToOneRelation,
          modelClass: Item,
          join: {
            from: 'collection_items.item_id',
            to: 'items.id'
          }
        },
        collection: {
            relation: Model.BelongsToOneRelation,
            modelClass: Collection,
            join: {
              from: 'collection_items.collection_id',
              to: 'collections.id'
            }
          },
        field_data: {
          relation: Model.HasManyRelation,
          modelClass: FieldData,
          join: {
            from: 'collection_items.item_id',
            to: 'field_data.item_id'
          }
        },
        item_tags: {
          relation: Model.HasManyRelation,
          modelClass: ItemTag,
          join: {
            from: 'collection_items.item_id',
            to: 'item_tags.item_id'
          }
        },
        comments: {
          relation: Model.HasManyRelation,
          modelClass: Comment,
          join: {
            from: 'collection_items.item_id',
            to: 'comments.item_id'
          }
        },
        likes: {
          relation: Model.HasManyRelation,
          modelClass: ItemLike,
          join: {
            from: 'collection_items.item_id',
            to: 'item_likes.item_id'
          }
        },

      };
};
