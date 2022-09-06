const {Model} = require('objection');
const knex = require('../config/database');
const User = require('../models/user');

Model.knex(knex);

module.exports = class Comment extends Model {
    static get tableName() {
        return 'comments';
    }
    static relationMappings = {
        user: {
          relation: Model.HasOneRelation,
          modelClass: User,
          join: {
            from: 'comments.user_id',
            to: 'users.id'
          }
        }
      };
};
